from DatabaseAPI import DatabaseAPI


class ProjectAPI(DatabaseAPI):
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        print('add')
        return None
