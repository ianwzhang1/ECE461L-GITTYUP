from server.data_providers.database import DatabaseProvider
from server.utils import data_missing
from flask import Response, jsonify


class HardwareProvider(DatabaseProvider):
    def post_add_noauth(self, args: list[str], data) -> Response:
        if data_missing(('name','quant', 'desc'), data):
            return Response('Missing POST data', 400)

        uuid = self.generate_uuid(data['name'])

        try:
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h", uuid=str(uuid))[0]  # 0 index unwraps EagerResult

            if len(match) > 0:
                return Response('Hardware Set With That Name Already Exists', 400)

            self._driver.execute_query("CREATE (h:Hset)"
                                       "SET h = {name: $name,"
                                       " quant: $quant,"
                                       "uuid: $uuid, desc: $desc}",
                                       name=data["name"],
                                       quant=data["quant"],
                                       uuid=str(uuid), desc=data['desc'])
            
            return jsonify(str(uuid))

        except Exception as e:
            return Response(str(e), 400)
        
       
    
    def get_allids(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            match = self._driver.execute_query("MATCH (h:Hset)"
                                               "RETURN h.uuid")
            return jsonify([item.get('h.uuid') for item in match[0]])
        except Exception as e:
            return Response(e, 400)
        
        

    def get_desc(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            if not self.__hid_exists(params['hid']):
                return Response('Hardware Set With That hid does not exist', 400)

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h.desc", uuid=params['hid'])[0]
            return jsonify(match[0].get('h.desc'))
        except Exception as e:
            return Response(str(e), 400)

        

    def __hid_exists(self, hid) -> bool:
        match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                           "RETURN h", uuid=hid)[0]  # 0 index unwraps EagerResult

        return len(match) > 0
    
    def post_details(self, args: list[str], data) -> Response:
        try:
            print(data)
            if data_missing(('hid',), data):
                return Response('Missing hid.', 400)
            
            has_desc = not data_missing(('desc',), data)
            has_quant = not data_missing(('quant',), data)

            if not (has_desc or has_quant):
                return Response("Missing both desc and quant, need at least one.")
            
            
            if not self.__hid_exists(data['hid']):
                return Response('Hardware Set With That hid does not exist', 400)
                
            if has_desc:
                match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                                "SET h.desc = $desc ", desc=data['desc'], uuid=data["hid"])[0]
            if has_quant:
                match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                                "SET h.quant = $quant ", quant=data['quant'], uuid=data["hid"])[0]
            
            return jsonify(True)
        
        except Exception as e:
            return Response(str(e), 400)


    def post_desc(self, args: list[str], data) -> Response:
        if data_missing(('hid', 'desc'), data):
            return Response('Missing POST data', 400)

        try:
            if not self.__hid_exists(data['hid']):
                return Response('Hardware Set With That hid does not exist', 400)

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "SET h.desc = $desc ", desc=data['desc'], uuid=data["hid"])[0]

            return jsonify(True)

        except Exception as e:
            return Response(str(e), 400)

    def post_delete_noauth(self, args: list[str], data) -> Response: # Admin command
        if data['bypass'] != 'unittest':
            return Response('Unauthorized', 404)
        self._driver.execute_query("MATCH (h:Hset {name: $name}) DETACH DELETE h", name=data['name'])
        return Response('OK')

    def post_quant(self, args: list[str], data) -> Response:
        if data_missing(('hid', 'quant'), data):
            return Response('Missing POST data', 400)

        try:
            if not self.__hid_exists(data['hid']):
                return Response('Hardware Set With That hid does not exist', 400)

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "SET h.quant = $quant ", quant=data['quant'], uuid=data["hid"])[0]

            return jsonify(True)

        except Exception as e:
            return Response(str(e), 400)

    def get_quant(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            if not self.__hid_exists(params['hid']):
                return Response('Hardware Set With That hid does not exist', 400)

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h.quant", uuid=params['hid'])[0]
        except Exception as e:
            return Response(str(e), 400)

        return jsonify(match[0].get('h.quant'))
    
    def get_details(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            if not self.__hid_exists(params['hid']):
                return Response('Hardware Set With That hid does not exist', 400)

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               " RETURN h.quant", uuid=params['hid'])[0]
            quant = match[0].get('h.quant')

            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               " RETURN h.desc", uuid=params['hid'])[0]
            desc = match[0].get('h.desc')

            returning_data = {
                'quant': quant,
                'desc': desc
            }
            return jsonify(returning_data)


        except Exception as e:
            return Response(str(e), 400)