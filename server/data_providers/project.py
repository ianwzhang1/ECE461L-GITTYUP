from server.data_providers.database import DatabaseProvider
from server.utils import data_missing
from flask import Response, jsonify

class ProjectProvider(DatabaseProvider):
    def __uid_exists(self, uid) -> bool:
        match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                           "RETURN u", uuid=str(uid))[0]  # 0 index unwraps EagerResult
        return len(match) > 0

    def __user_exists(self, username) -> bool:
        match = self._driver.execute_query("MATCH (u:User {username: $username})"
                                           "RETURN u", username=str(username))[0]  # 0 index unwraps EagerResult
        return len(match) > 0

    def __pid_exists(self, pid) -> bool:
        match = self._driver.execute_query("MATCH (p:Proj {uuid: $uuid})"
                                               "RETURN p", uuid=str(pid))[0]  # 0 index unwraps EagerResult

        return len(match) > 0

    def __hid_exists(self, hid) -> bool:
        match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h", uuid=hid)[0]  # 0 index unwraps EagerResult

        return len(match) > 0



    def post_add(self, args: list[str], data) -> Response:
        if data_missing(('name', 'uid'), data):
            return Response('Missing POST data', 400)

        project_uuid = self.generate_uuid(data['name'])

        try:
            if self.__pid_exists(project_uuid):
                return Response('ProjectPreview with same name already exists', 400)

            if not self.__uid_exists(data['uid']):
                return Response('The specified admin listed does not exist', 400)

            # edges go from users to projects
            self._driver.execute_query("CREATE (p:Proj)"
                                       " SET p = {name: $name, uuid: $proj_uuid, desc: $desc}"
                                       " WITH p"
                                       " MATCH (u:User {uuid: $user_uuid})"
                                       " CREATE (u)-[:MEMBER_OF {admin:$admin} ]->(p)",
                                       name=data['name'], proj_uuid=str(project_uuid),
                                       user_uuid=data['uid'],
                                       admin=True,
                                       desc="")
            data = project_uuid
            return jsonify(data)
        except Exception as e:
            return Response(str(e), 400)



    def post_desc(self, args: list[str], data) -> Response:
        if data_missing(('pid', 'desc'), data):
            return Response('Missing POST data', 400)

        try:
            if not self.__pid_exists(data['pid']):
                return Response('ProjectPreview named by PID does not exist', 400)

            match = self._driver.execute_query("MATCH (p:Proj{uuid: $uuid}) "
                                               " SET p.desc = $desc", desc= data['desc'], uuid=data['pid'])

            return jsonify('Done')

        except Exception as e:
            return Response(str(e), 400)

    def get_desc(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            if not self.__pid_exists(params['pid']):
                return Response('ProjectPreview With That pid does not exist', 400)

            match = self._driver.execute_query("MATCH (p:Proj {uuid: $uuid})"
                                               " RETURN p.desc", uuid=params['pid'])[0]
            data = str(match[0].get('p.desc'))
            return jsonify(data)
        except Exception as e:
            return Response(str(e), 400)




    # The following is part of user

    def get_user_all(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            pid = params['pid']
            if not self.__pid_exists(pid):
                return Response('ProjectPreview with that pid does not exist', 400)

            match = self._driver.execute_query("MATCH (u:User) -[r:MEMBER_OF]-> (p:Proj {uuid: $pid})"
                                            " RETURN u.uuid, r.admin",
                                            pid = pid)[0]
            users_list = list()
            admins_list = list()
            for user in match:
                uid = user.get('u.uuid')
                is_admin = user.get('r.admin')
                users_list.append(uid)
                if is_admin:
                    admins_list.append(uid)

            result_dict = dict()
            result_dict['users'] = users_list
            result_dict['admins'] = admins_list

            return jsonify(result_dict)
        except Exception as e:
            return Response(str(e), 400)

    def get_user_status(self, args: list[str], params: dict[str, str]) -> Response:
        if data_missing(('uid', 'pid'), params):
            return Response('Missing POST data', 400)

        uid, pid = params['uid'], params['pid']
        if not self.__uid_exists(uid):
            return Response('UID does not exist', 400)
        if not self.__pid_exists(pid):

            return Response('PID does not exist', 400)

        match = self._driver.execute_query("MATCH (u:User {uuid: $uid})"
                                   "-[r:MEMBER_OF]->(p:Proj {uuid: $pid})"
                                   "RETURN r.admin",
                                   uid = uid,
                                   pid = pid)

        return jsonify(str(match[0][0].get('r.admin')), 200)

    # this method calls the above two as necessary
    def get_user(self, args: list[str], params: dict[str, str]) -> Response:
        try:

            if args[0] == 'all':
                return self.get_user_all(args[1:], params)
            if args[0] == 'status':
                return self.get_user_status(args[1:], params)
        except Exception as e:
            return Response(str(e), 400)

    def post_user_add(self, args: list[str], data) -> Response:

        if data_missing(('username', 'pid'), data):
            return Response('Missing POST data', 400)

        username, pid = data['username'], data['pid']
        if not self.__user_exists(username):
            return Response('No user could be found with that username', 400)
        if not self.__pid_exists(pid):
            return Response('Invalid project! Please reload the page.', 400)

        self._driver.execute_query("MATCH (u:User {username: $username})"
                                "MATCH (p:Proj {uuid: $pid})"
                                "MERGE (u) -[r:MEMBER_OF]-> (p)"
                                "SET r.admin = $priv",
                                username = username,
                                pid = pid,
                                priv = False
                                )
        return jsonify(True)


    def post_user_rm(self, args: list[str], data) -> Response:
        if data_missing(('uid', 'pid'), data):
            return Response('Missing POST data', 400)

        uid, pid = data['uid'], data['pid']
        if not self.__uid_exists(uid):
            return Response('UID does not exist', 400)
        if not self.__pid_exists(pid):
            return Response('PID does not exist', 400)

        self._driver.execute_query("MATCH (u:User {uuid: $uid})"
                                "-[r:MEMBER_OF]->(p:Proj {uuid: $pid})"
                                "DELETE r",
                                uid = uid,
                                pid = pid
                                )
        return jsonify(True)


    def post_user_edit(self, args: list[str], data) -> Response:
        if data_missing(('uid', 'pid', 'admin'), data):
            return Response('Missing POST data', 400)

        uid, pid, admin = data['uid'], data['pid'], data['admin']
        if not self.__uid_exists(uid):
            return Response('UID does not exist', 400)
        if not self.__pid_exists(pid):

            return Response('PID does not exist', 400)

        self._driver.execute_query("MATCH (u:User {uuid: $uid})"
                                "-[r:MEMBER_OF]->(p:Proj {uuid: $pid})"
                                "SET r.admin = $priv",
                                uid = uid,
                                pid = pid,
                                priv = admin
                                )
        return jsonify(True)


    # this method  calls the above three as necessary
    def post_user(self, args: list[str], data) -> Response:
        try:
            if args[0] == 'add':
                return self.post_user_add(args, data)
            if args[0] == 'rm' :
                return self.post_user_rm(args, data)
            if args[0] == 'edit':
                return self.post_user_edit(args, data)

        except Exception as e:
            return Response(str(e), 400)

    # End part of user
    def post_checkout(self, args: list[str], data) -> Response:
        if data_missing(('hid', 'pid', 'quant'), data):
            return Response('Missing POST data', 400)

        try:
            if not self.__hid_exists(data['hid']):
                return Response('Hardware Set With That hid does not exist', 400)

            # get current hset quantity
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h.quant", uuid=data['hid'])[0]

            curr_quantity = match[0].get('h.quant')
            modified = int(curr_quantity) - int(data['quant'])
            if modified < 0:
                return Response('Insufficient quantity in hardware set', 400)

            # set quantity of hset
            self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                       " SET h.quant = $quant ", quant=modified, uuid=data["hid"])[0]

            # create relationship to signify how many owned
            match = self._driver.execute_query("MATCH (p:Proj {uuid: $pid})"
                                       " MATCH (h:Hset {uuid: $hid})"
                                       " MERGE (p)-[b:BORROWED]->(h)"
                                       " ON CREATE "
                                       " SET b.quant = $zero"
                                       " WITH b"
                                       " RETURN b.quant",
                                       pid = data['pid'],
                                       hid = data['hid'],
                                       zero = 0
                                       )
            current_quantity = int(match[0][0].get("b.quant"))
            new_quantity = current_quantity + int(data['quant'])
            self._driver.execute_query("MATCH (p:Proj {uuid: $pid})-[b:BORROWED]->(h:Hset {uuid:$hid})"
                                       " SET b.quant = $quant",
                                       pid = data['pid'],
                                       hid = data['hid'],
                                       quant = new_quantity)
            return jsonify(True)
        except Exception as e:
            return Response(str(e), 400)


    def post_return(self, args:list[str], data) -> Response:
        if data_missing(('hid', 'pid'), data):
            return Response('Missing POST data', 400)

        try:


            match = self._driver.execute_query("MATCH (p:Proj {uuid: $pid}) -[b:BORROWED]-> (h:Hset {uuid: $hid})"
                                               " RETURN b.quant",
                                               pid = data['pid'], hid=data['hid'])[0]
            if len(match) < 1:
                return Response('No hardware sets assigned to this project', 400)
            old_quantity_borrowed = int(match[0].get("b.quant"))
            self._driver.execute_query("MATCH (p:Proj {uuid: $pid}) -[b:BORROWED]-> (h:Hset {uuid: $hid})"
                                               " DELETE b",
                                               pid = data['pid'], hid=data['hid'])

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h.quant", uuid=data['hid'])[0]

            curr_quantity = match[0].get('h.quant')

            self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                       " SET h.quant = $quant ", quant=curr_quantity + old_quantity_borrowed, uuid=data["hid"])[0]

            return jsonify(True)


        except Exception as e:
            return Response(str(e), 400)

    def get_checkedout(self, args:list[str], params) -> Response:
        if data_missing(('hid', 'pid'), params):
            return Response('Missing POST data', 400)

        try:
            if not self.__hid_exists(params['hid']):
                return Response('HSet with that hid does not exist', 400)

            if not self.__pid_exists(params['pid']):
                return Response('ProjectPreview with that pid does not exist', 400)

            match = self._driver.execute_query("MATCH (p:Proj {uuid: $pid}) -[b:BORROWED]-> (h:Hset {uuid: $hid})"
                                               " RETURN b.quant",
                                               pid = params['pid'], hid=params['hid'])[0]

            if len(match) < 1:
                return Response('No hardware sets assigned to this project', 400)


            quantity_borrowed = int(match[0].get("b.quant"))
            return jsonify(quantity_borrowed)

        except Exception as e:
            return Response(str(e), 400)

    def get_info(self, args:list[str], params) -> Response:
        def get_all_hids():
            match = self._driver.execute_query("MATCH (h:Hset) RETURN h.uuid, h.name, h.desc, h.quant")[0]
            return {item.get('h.uuid'): {'name': item.get('h.name'), 'desc': item.get('h.desc'), 'availability': item.get('h.quant'), 'checked_out': 0} for item in match}

        def get_borrowed(pid):
            match = self._driver.execute_query("MATCH (p:Proj {uuid: $pid}) -[b:BORROWED]-> (h:Hset)"
                                               " RETURN b.quant, h.name, h.uuid",
                                               pid=pid)[0]

            res = {}
            for element in match:
                res[element.get('h.uuid')] = element.get('b.quant')
            return res

        if data_missing(('pid',), params):
            return Response('Missing POST data', 400)

        try:
            if not self.__pid_exists(params['pid']):
                return Response('Project with that pid does not exist', 400)

            match = self._driver.execute_query("MATCH (p:Proj {uuid: $pid}) "
                                               " RETURN p.name, p.desc ",
                                               pid = params['pid'])[0]

            project_data = dict()
            project_name = match[0].get("p.name")
            description = match[0].get("p.desc")
            hardware = get_all_hids()

            for borrowed in get_borrowed(params['pid']).items():  # Superimpose borrowed counts
                hardware[borrowed[0]]['checked_out'] = borrowed[1]

            project_data["name"] = project_name
            project_data["desc"] = description

            hardware_array = []
            for item in hardware.items(): # Convert dict to an array
                item[1]['hid'] = item[0]  # Add hid to the inner dict
                hardware_array.append(item[1])

            project_data['hw'] = hardware_array

            return jsonify(project_data)

        except Exception as e:
            return Response(str(e), 400)



