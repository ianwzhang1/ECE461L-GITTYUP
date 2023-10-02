from server.DatabaseAPI import DatabaseAPI
from server.Utils import data_missing
import bcrypt

class UserAPI(DatabaseAPI):
    # POST request for adding user
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('usr', 'pwd', 'name'), data):
            return False, 'Missing POST data'

        uuid = self.generate_uuid(data['usr'])

        try:
            match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                               "RETURN u", uuid=str(uuid))[0]  # 0 index unwraps EagerResult

            # Check if username already exists
            if len(match) > 0:
                return False, "Username already exists"

            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(data['pwd'].encode('utf-8'), salt)

            self._driver.execute_query("CREATE (u:User)"
                                       "SET u = {username: $usr, password: $pwd, salt: $salt, dispname: $name, "
                                       "uuid: $uuid}",
                                       usr=data['usr'], pwd=hashed.decode('utf-8'), salt=salt.decode('utf-8'), name=data['name'], uuid=str(uuid))
        except Exception as e:
            return False, e

        return True, str(uuid)

    def get_projects(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                               "RETURN u.projects", uuid=params['uid'])[0]
        except Exception as e:
            return False, e

        return True, match[0].get('u.projects')

    def get_info(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                               "RETURN properties(u) AS map", uuid=params['uid'])[0]
        except Exception as e:
            return False, e

        return True, match[0].get('map')

    def post_login(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('usr', 'pwd'), data):
            return False, 'Missing POST data'

        try:
            match = self._driver.execute_query("MATCH (u:User {username: $usr})"
                                               "RETURN u.salt, u.password", usr=data['usr'])[0]

            # Check if username invalid
            if len(match) == 0:
                return False, "Unknown username"

            salt = bytes(match[0].get('u.salt'), 'utf-8')
            print(salt)
            hashed = bcrypt.hashpw(data['pwd'].encode('utf-8'), salt)
            print(hashed.decode('utf-8'))

            if match[0].get('u.password') == hashed.decode('utf-8'):
                return True, "Logged In"  # Need to return a sess id
            else:
                return False, "Incorrect password"
        except Exception as e:
            return False, e

    def get_deleteall(self, args: list[str], params: dict[str, str]) -> tuple[bool, object]:
        try:
            self._driver.execute_query("MATCH (u:User)"
                                       "DETACH DELETE u"
                                       )
        except Exception as e:
            return False, e

        return True, "Done"
