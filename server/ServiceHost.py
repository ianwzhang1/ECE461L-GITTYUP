import simplejson

import DatabaseAPI

from http.server import HTTPServer, SimpleHTTPRequestHandler  # Request handling
from neo4j import GraphDatabase  # Graph DB
from jproperties import Properties  # Config parsing

from server.UserAPI import UserAPI
from server.ProjectAPI import ProjectAPI
from server.HardwareAPI import HardwareAPI

# Server settings
HOST_NAME = "localhost"
PORT = 8080

# Read configuration secrets
secrets = Properties()
with open('secrets.properties', 'rb') as config_file:
    secrets.load(config_file)

# Initialize graph driver
graph_driver = GraphDatabase.driver(secrets['DB_URI'].data, auth=(secrets['DB_USER'].data, secrets['DB_PASS'].data))
graph_driver.verify_connectivity()

# Build API handlers
user_api = UserAPI(graph_driver)
project_api = ProjectAPI(graph_driver)
hardware_api = HardwareAPI(graph_driver)


# Handle requests
class PythonServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        path = self.path[1:].split('/')

        result = None

        if path[0] == 'user':
            result = user_api.process(False, path[1:])
        elif path[0] == 'proj':
            result = project_api.process(False, path[1:])
        elif path[0] == 'hset':
            result = hardware_api.process(False, path[1:])

        if result[1] is None:
            response = 'No Response'

        response = str(result[1])  # Convert non-string return types

        self.send_response(200 if result[0] else 400, "OK")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))

    def do_POST(self):
        print(self.path)
        path = self.path[1:].split('/')

        data_string = self.rfile.read(int(self.headers['Content-Length']))
        data = simplejson.loads(data_string)
        result = None

        if path[0] == 'user':
            result = user_api.process(True, path[1:], data)
        elif path[0] == 'proj':
            result = project_api.process(True, path[1:], data)
        elif path[0] == 'hset':
            result = hardware_api.process(True, path[1:], data)

        if result[1] is None:
            response = 'No Response'

        response = str(result[1])  # Convert non-string return types

        self.send_response(200 if result[0] else 400, "OK")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))


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
