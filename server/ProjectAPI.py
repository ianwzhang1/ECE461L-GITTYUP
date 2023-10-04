from DatabaseAPI import DatabaseAPI
from Utils import data_missing

class ProjectAPI(DatabaseAPI):
    def __uid_exists(self, uid) -> bool:
        match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                               "RETURN u", uuid=str(uid))[0]  # 0 index unwraps EagerResult        
        return len(match) > 0

    def __pid_exists(self, pid) -> bool:
        match = self._driver.execute_query("MATCH (p:Proj {uuid: $uuid})"
                                               "RETURN p", uuid=str(pid))[0]  # 0 index unwraps EagerResult
            
        return len(match) > 0
    
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('name', 'uid'), data):
            return False, 'Missing POST data'

        project_uuid = self.generate_uuid(data['name'])

        try:
            if self.__pid_exists(project_uuid):
                return False, "Project with same name already exists"
            
            if self.__uid_exists(data['uid']):
                return False, "The specified admin listed does not exist"
            
            # edges go from users to projects 
            self._driver.execute_query("CREATE (p:Proj)"
                                       "SET p = {name: $name, uuid: $proj_uuid}"
                                       "MATCH (u:User {uuid: $user_uuid})"
                                       "CREATE (u)-[:MEMBER_OF{admin:'True'}]->(p)",
                                       name=data['name'], proj_uuid=str(project_uuid),
                                       user_uuid=data['uid'])
        except Exception as e:
            return False, e

        return True, str(project_uuid)
    
    def post_desc(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('pid', 'desc'), data):
            return False, 'Missing POST data'
        
        try:
            if not self.__pid_exists(data['pid']):
                return False, 'Project named by PID does not exist'
            
            match = self._driver.execute_query("MATCH (p:Proj) {uuid: $uuid}"
                                               "SET p.desc = $desc", desc= data['desc'], uuid=data['pid'])
            
            return True, True
            
        except Exception as e:
            return False, e
        
    def get_desc(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            if not self.__pid_exists(params['pid']):
                return False, "Project With That pid does not exist"
            
            match = self._driver.execute_query("MATCH (p:Proj {uuid: $uuid})"
                                               "RETURN p.desc", uuid=params['pid'])[0]
        except Exception as e:
            return False, e

        return True, match[0].get('p.desc')
    
    
    # The following is part of user

    def get_user_all(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        pass

    def get_user_status(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        pass

    # this method calls the above two as necessary
    def get_user(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        if args[0] == 'all':
            return self.get_user_all(args[1:], params)
        if args[0] == 'status':
            return self.get_user_status(args[1:], params)

    def post_user_add(self, args: list[str], data) -> tuple[bool, object]:
        pass

    def post_user_rm(self, args: list[str], data) -> tuple[bool, object]:
        pass

    def post_user_edit(self, args: list[str], data) -> tuple[bool, object]:
        pass

    # this method  calls the above three as necessary
    def post_user(self, args: list[str], data) -> tuple[bool, object]:
        if args[0] == 'add':
            return self.post_user_add(args, data)
        if args[0] == 'rm' :
            return self.post_user_rm(args, data)
        if args[0] == 'edit':
            return self.post_user_edit(args, data)

    # End part of user
    def post_checkout(self, args: list[str], data) -> tuple[bool, object]:
        pass

    def post_return(self, args:list[str], data) -> tuple[bool, object]:
        pass
            

    