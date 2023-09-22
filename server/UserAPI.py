class UserAPI:
    def __init__(self, driver):
        self.__driver = driver

    def process(self, args: list[str]) -> str:
        if args[0] == "add":
            self.__driver.execute_query("CREATE (u:User)"
                                        "SET u.name = $name", name="test")
            return "add"

        if args[0] == "test":
            result = self.__driver.execute_query("MATCH (u:User)"
                                        "RETURN u")
            print(*result[0])
            return "HAHAHAHAHA"

        return "User: OK"
