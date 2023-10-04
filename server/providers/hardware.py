from server.providers.database import DatabaseProvider
from server.utils import data_missing


class HardwareProvider(DatabaseProvider):
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('name',), data):
            return False, 'Missing POST data'
        
        uuid = self.generate_uuid(data['name'])

        try:
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h", uuid=str(uuid))[0]  # 0 index unwraps EagerResult
            
            if len(match) > 0:
                return False, "Hardware Set With That Name Already Exists"
            
            self._driver.execute_query("CREATE (h:Hset)"
                                       "SET h = {name: $name,"
                                       "uuid: $uuid}",
                                       name=data["name"],
                                       uuid = str(uuid))
            
        except Exception as e:
            return False, e
        
        return True, str(uuid)
    
    def get_allids(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            match = self._driver.execute_query("MATCH (h:Hset)"
                                               "RETURN h.uuid")
        except Exception as e:
            return False, e

        return True, [item.get ('h.uuid') for item in match[0]]
    

    def get_desc(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            if not self.__hid_exists(params['hid']):
                return False, "Hardware Set With That hid does not exist"
            
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h.desc", uuid=params['hid'])[0]
        except Exception as e:
            return False, e

        return True, match[0].get('h.desc')
    
    def __hid_exists(self, hid) -> bool:
        match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h", uuid=hid)[0]  # 0 index unwraps EagerResult
            
        return len(match) > 0
    
    def post_desc(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('hid','desc'), data):
            return False, 'Missing POST data'

        try:
            if not self.__hid_exists(data['hid']):
                return False, "Hardware Set With That hid does not exist"
            
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "SET h.desc = $desc ", desc=data['desc'], uuid=data["hid"])[0]
            
            return True, True
            
        except Exception as e:
            return False, e
        
    def post_quant(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('hid', 'quant'), data):
            return False, 'Missing POST data'
        
        try:
            if not self.__hid_exists(data['hid']):
                return False, "Hardware Set With That hid does not exist"
            
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "SET h.quant = $quant ", quant=data['quant'], uuid=data["hid"])[0]

            return True, True
        
        except Exception as e:
            return False, e
        
    
    def get_quant(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            if not self.__hid_exists(params['hid']):
                return False, "Hardware Set With That hid does not exist"
            
            match = self._driver.execute_query("MATCH (h:Hset {uuid: $uuid})"
                                               "RETURN h.quant", uuid=params['hid'])[0]
        except Exception as e:
            return False, e

        return True, match[0].get('h.quant')
        
