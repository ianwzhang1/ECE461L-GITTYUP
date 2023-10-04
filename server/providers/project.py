from server.providers.database import DatabaseProvider


class ProjectProvider(DatabaseProvider):
    def post_add(self, args: list[str], data) -> tuple[bool, object]:
        print('add')
        return None
