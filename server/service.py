import simplejson

from http.server import HTTPServer, SimpleHTTPRequestHandler  # Request handling
from neo4j import GraphDatabase  # Graph DB
from jproperties import Properties  # Config parsing

import uuid

from providers.hardware import HardwareProvider
from providers.project import ProjectProvider
from providers.user import UserProvider

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

# Declare namespace for consistent UUID generation
namespace = uuid.UUID('934c3fda-c00c-4457-b071-8d1193cd8a3c')

# Build API handlers
user_api = UserProvider(graph_driver, namespace)
project_api = ProjectProvider(graph_driver, namespace)
hardware_api = HardwareProvider(graph_driver, namespace)


# Handle requests
class PythonServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        path = self.path[1:].split('/')

        last = len(path) - 1
        pSplit = None
        if '?' in path[last]:  # Contains path param
            pSplit = path[last].split('?')
            path[last] = pSplit[0]

        paramsSet = pSplit[1].split('&') if pSplit is not None else None
        params = dict((x[0], x[1]) for x in [e.split('=') for e in paramsSet]) if paramsSet is not None else None

        result = None

        if path[0] == 'user':
            result = user_api.process(False, path[1:], params=params)
        elif path[0] == 'proj':
            result = project_api.process(False, path[1:], params=params)
        elif path[0] == 'hset':
            result = hardware_api.process(False, path[1:], params=params)

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
        try:
            data = simplejson.loads(data_string)
            result = None

            if path[0] == 'user':
                result = user_api.process(True, path[1:], data=data)
            elif path[0] == 'proj':
                result = project_api.process(True, path[1:], data=data)
            elif path[0] == 'hset':
                result = hardware_api.process(True, path[1:], data=data)
            else:
                print("Error")

            if result[1] is None:
                response = 'No Response'

        except simplejson.JSONDecodeError:
            result = (False, "Invalid JSON Body")

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
