from server.DatabaseAPI import DatabaseAPI


class HardwareAPI(DatabaseAPI):
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        print('add')
        return None
