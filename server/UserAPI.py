from server.DatabaseAPI import DatabaseAPI
from server.Utils import data_missing


class UserAPI(DatabaseAPI):
    # POST request for adding user
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        if data_missing(('usr', 'pwd', 'name'), data):
            return False, 'Missing POST data'

        # Need to add a check for if user already exists

        try:
            self._driver.execute_query("CREATE (u:User)"
                                       "SET u = {username: $usr, password: $pwd, dispname: $name}",
                                       usr=data['usr'], pwd=data['pwd'], name=data['name'])
        except Exception as e:
            return False, e

        return True, "Successfully added user"

    def get_projects(self, args: list[str]) -> tuple[bool, object]:
        return True, "A lot of projects"
