from base64 import decode

from neo4j import GraphDatabase, exceptions  # Graph DB
import uuid
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import sys
import signal

from server.data_providers.hardware import HardwareProvider
from server.data_providers.project import ProjectProvider
from server.data_providers.user import UserProvider
from server.session_handler import SessionHandler

app = Flask('GITTYUP')
app.config.from_pyfile('secrets.properties', silent=False)

CORS(app)

# Initialize graph driver
try:
    graph_driver = GraphDatabase.driver(app.config['DB_URI'], auth=(app.config['DB_USER'], app.config['DB_PASS']))
    graph_driver.verify_connectivity()
except ValueError:
    print('Neo4j Database Address could not be resolved (Is the database started?)')
    exit()
except exceptions.ServiceUnavailable:
    print('Neo4j Service Unavailable (Is the database started?)')
    exit()

# Declare namespace for consistent UUID generation
namespace = uuid.UUID('934c3fda-c00c-4457-b071-8d1193cd8a3c')

# Session handler for tracking users and expiring access
session_handler = SessionHandler(10)

# Build API handlers
user_api = UserProvider(graph_driver, namespace, session_handler)
project_api = ProjectProvider(graph_driver, namespace, session_handler)
hardware_api = HardwareProvider(graph_driver, namespace, session_handler)


def handler(signal, frame):  # Handler for ensuring database is closed upon exit
    print('Shutting down!')
    graph_driver.close()
    sys.exit(0)

def pack_message(message):
    return app.json.dumps({'message': message})

signal.signal(signal.SIGINT, handler)


@app.route('/<path:path>', methods=['GET', 'POST'])
def user(path):
    api = None
    path = path.split('/')
    if path[0] == 'user':
        api = user_api
    elif path[0] == 'proj':
        api = project_api
    elif path[0] == 'hset':
        api = hardware_api

    if api is None:
        return pack_message('Unknown API type'), 400

    token = request.cookies.get('session_id')

    response = None

    if request.method == 'GET':
        response = api.process(False, path[1:], params=request.args, auth=token)
    elif request.method == 'POST':
        response = api.process(True, path[1:], data=request.json, auth=token)

    if not response.is_json:  # Jsonify non-json messages
        response.data = pack_message(response.data.decode())
        response.content_type = 'application/json'

    return response
