import flask

from server.data_providers.database import DatabaseProvider
from server.utils import data_missing
from flask import Response, jsonify
import bcrypt


class UserProvider(DatabaseProvider):
    def uid_exists(self, uid) -> bool:
        match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                           "RETURN u", uuid=str(uid))[0]  # 0 index unwraps EagerResult
        return len(match) > 0

    # POST request for adding user
    def post_add_noauth(self, args: list[str], data) -> Response:
        if data_missing(('usr', 'pwd', 'name'), data):
            return Response('Missing POST data', 400)

        uuid = self.generate_uuid(data['usr'])

        try:
            if self.uid_exists(uuid):
                return Response('Username already exists', 400)

            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(data['pwd'].encode('utf-8'), salt)

            self._driver.execute_query("CREATE (u:User)"
                                       "SET u = {username: $usr, password: $pwd, salt: $salt, dispname: $name, "
                                       "uuid: $uuid}",
                                       usr=data['usr'], pwd=hashed.decode('utf-8'), salt=salt.decode('utf-8'),
                                       name=data['name'], uuid=str(uuid))
            
            data = {
                'uid': str(uuid),
                'session_id': self._session_handler.new_session(str(uuid))
            }
            return jsonify(data)

        except Exception as e:
            return Response(str(e), 400)

    def get_projects(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            uid = params['uid']
            if not self.uid_exists(uid):
                return Response('User with that uid does not exist', 400)
            
            match = self._driver.execute_query("MATCH (u:User {uuid: $uid}) -[:MEMBER_OF]-> (p:Proj)"
                                            " RETURN p.uuid",
                                            uid = uid)
            
            projects = [proj.get ('p.uuid') for proj in match[0]]
            data = projects
            return jsonify(data)
        except Exception as e:
            return Response(str(e), 400)

    def get_info(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            match = self._driver.execute_query("MATCH (u:User {uuid: $uuid})"
                                               "RETURN properties(u) AS map", uuid=params['uid'])[0]
        except Exception as e:
            return Response(str(e), 400)
        
        data =  match[0].get('map')
        
        return Response(jsonify(data), 200)

    def post_login_noauth(self, args: list[str], data) -> Response:
        if data_missing(('usr', 'pwd'), data):
            return Response('Missing POST data', 400)

        try:
            match = self._driver.execute_query("MATCH (u:User {username: $usr})"
                                               "RETURN u.salt, u.password, u.uuid", usr=data['usr'])[0]

            # Check if username invalid
            if len(match) == 0:
                return Response('Unknown username', 400)

            salt = bytes(match[0].get('u.salt'), 'utf-8')
            hashed = bcrypt.hashpw(data['pwd'].encode('utf-8'), salt)

            if match[0].get('u.password') == hashed.decode('utf-8'):
                return jsonify({'uid': match[0].get('u.uuid'), 'session_id': self._session_handler.new_session(match[0].get('u.uuid'))})
            else:
                return Response('Incorrect password', 400)
        except Exception as e:
            return Response(str(e), 400)

    def get_deleteall(self, args: list[str], params: dict[str, str]) -> Response:
        try:
            self._driver.execute_query("MATCH (u:User)"
                                       "DETACH DELETE u"
                                       )
        except Exception as e:
            return Response(str(e), 400)

        return jsonify('Done')

    def get_test_noauth(self, args: list[str], params: dict[str, str]) -> Response:
        return Response('Hey buddy!', 200)
