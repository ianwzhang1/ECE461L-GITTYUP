import uuid
from flask import Response


class DatabaseProvider:
    def __init__(self, driver, namespace, session_handler):
        self._driver = driver
        self._namespace = namespace
        self._session_handler = session_handler
        self._get_actions: dict[str, callable] = {}  # GET requests
        self._post_actions: dict[str, callable] = {}  # POST requests
        # All noauth actions must be in either get or post actions
        # Any actions not in noauth will require authentication
        self._noauth_actions: dict[str, callable] = {}  # Requests which do not need auth.

        # Fill the actions map with func_name: callable
        # These actions have not yet been filtered for authentication
        get_actions: dict[str, callable] = {func[4:]: getattr(self, func) for func in dir(self) if
                                            callable(getattr(self, func)) and func.startswith('get_')}
        post_actions: dict[str, callable] = {func[5:]: getattr(self, func) for func in dir(self) if
                                             callable(getattr(self, func)) and func.startswith('post_')}
        # Filter for authentication
        for func in get_actions.items():
            name = func[0]
            if name.endswith('_noauth'):
                name = name[0:-7]
                self._noauth_actions[name] = func[1]
            self._get_actions[name] = func[1]

        for func in post_actions.items():
            name = func[0]
            if name.endswith('_noauth'):
                name = name[0:-7]
                self._noauth_actions[name] = func[1]
            self._post_actions[name] = func[1]

    # Returns Success/Fail status and message which will get stringified later
    def process(self, is_post: bool, args: list[str], data=None, params: dict[str, str] = None) -> Response:

        if len(args) == 0:
            return Response('No path specified', 400)

        if args[0] not in self._noauth_actions:  # Need to authenticate token
            auth = params['session_id'] if 'session_id' in params else None
            if auth is None:
                return Response('Authentication is required for this action', 404)

            if not self._session_handler.validate_session(auth):
                return Response('Please log back in!', 404)

        if is_post:
            if args[0] in self._post_actions:
                return self._post_actions[args[0]](args[1:], data)
        else:
            if args[0] in self._get_actions:
                return self._get_actions[args[0]](args[1:], params)

        return Response('Unsupported Operation', 400)

    def generate_uuid(self, name) -> uuid.UUID:
        return uuid.uuid5(self._namespace, name)
