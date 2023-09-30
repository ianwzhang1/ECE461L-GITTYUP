class DatabaseAPI:
    def __init__(self, driver):
        self._driver = driver
        # Fill the actions map with func_name: callable
        self._get_actions = {func[4:]: getattr(self, func) for func in dir(self) if
                             callable(getattr(self, func)) and func.startswith('get_')}
        self._post_actions = {func[5:]: getattr(self, func) for func in dir(self) if
                              callable(getattr(self, func)) and func.startswith('post_')}

    # Returns Success/Fail status and message which will get stringified later
    def process(self, is_post: bool, args: list[str], data: str = None) -> tuple[bool, object]:

        if len(args) == 0:
            return False, 'No path specified'

        if is_post:
            if args[0] in self._post_actions:
                return self._post_actions[args[0]](args[1:], data)
        else:
            if args[0] in self._get_actions:
                return self._get_actions[args[0]](args[1:])

        return False, 'Unsupported Operation'
