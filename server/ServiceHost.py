import UserAPI

from http.server import HTTPServer, SimpleHTTPRequestHandler # Request handling
from neo4j import GraphDatabase # Graph DB
from jproperties import Properties # Config parsing

HOST_NAME = "localhost"
PORT = 8080

secrets = Properties()
with open('secrets.properties', 'rb') as config_file:
    secrets.load(config_file)

graph_driver = GraphDatabase.driver(secrets['DB_URI'].data, auth=(secrets['DB_USER'].data, secrets['DB_PASS'].data))
graph_driver.verify_connectivity()

user_api = UserAPI.UserAPI(graph_driver)

# Handle requests
class PythonServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        path = self.path[1:].split('/')
        # path[len(path) - 1].split('?')
        response = 'None'

        if path[0] == 'user':  # User API redirection
            response = user_api.process(path[1:])

        self.send_response(200, "OK")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))

    # def do_POST(self):
    #     print(self.path)
    #     path = self.path[1:].split('/')
    #
    #     data_string = self.rfile.read(int(self.headers['Content-Length']))
    #     data = simplejson.loads(self.data_string)
    #     with open("test123456.json", "w") as outfile:
    #         simplejson.dump(data, outfile)
    #     print "{}".format(data)
    #     f = open("for_presen.py")
    #     self.wfile.write(f.read())
    #
    #
    #
    #     if path[0] == 'user':  # User API redirection
    #         response = user.process(path[1:])
    #
    #     self.send_response(200, "OK")
    #     self.send_header("Content-Length", str(len(response)))
    #     self.end_headers()
    #     self.wfile.write(bytes(response, "utf-8"))


if __name__ == '__main__':
    server = HTTPServer((HOST_NAME, PORT), PythonServer)
    print(f"Login server started at http://{HOST_NAME}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
        graph_driver.close()
        print("Server stopped successfully")
        exit(0)
