import requests
from requests import Request, Response
import uuid
import pytest_check as check
from pytest import fixture
from jproperties import Properties
from neo4j import GraphDatabase, exceptions

base_uri = 'http://localhost:5000/'

# Store user session for testing
uid: str
session_id: str = ''
# Store test project
pid: str
# Store test hardware
hid: str


def get(path, params=None) -> Response:
    if session_id is not '':
        params['session_id'] = session_id
    return requests.get(base_uri + path, params)


def post(path, data=None) -> Response:
    return requests.post(base_uri + path, json=data, params=
    {'session_id': session_id} if session_id is not None else None)


@fixture(scope="module", autouse=True)
def module_setup(request):
    response = get('user/test')
    if response.status_code == 400:
        print('Could not connect to Flask app. Is it running?')
        return

    def wipe():  # Cleanup by deleting added user
        print('Cleaning up')
        post('proj/delete', {'bypass': 'unittest', 'name': 'testproj'})
        post('user/delete', {'bypass': 'unittest', 'username': 'testuser'})
        post('hset/delete', {'bypass': 'unittest', 'name': 'testhw'})

    wipe()

    request.addfinalizer(wipe)


def test_add_user():
    post_data = {'name': 'Test User', 'usr': 'testuser', 'pwd': 'testpassword'}
    response = post('user/add', post_data)

    assert response.status_code == 200 or print(response.content)
    json = response.json()
    assert json is not None
    assert 'uid' in json


def test_login_user():
    global uid, session_id
    post_data = {'usr': 'testuser', 'pwd': 'testpassword'}
    response = post('user/login', post_data)  # Login

    assert response.status_code == 200 or print(response.content)
    json = response.json()
    assert json is not None
    assert 'uid' in json
    assert 'session_id' in json
    uid = json['uid']
    session_id = json['session_id']


def test_create_project():
    global pid
    proj_data = {'name': 'testproj', 'uid': uid}
    proj_response = post('proj/add', proj_data)

    assert proj_response.status_code == 200 or print(proj_response.content)
    proj_json = proj_response.json()
    assert proj_json is not None  # A uuid will be in the json
    pid = proj_json


def test_hw_add():
    global hid
    hset_data = {'name': 'testhw', 'quant': '5', 'desc': 'Test HW'}
    hset_response = post('hset/add', hset_data)
    assert hset_response.status_code == 200 or print(hset_response.content)
    add_json = hset_response.json()
    assert add_json is not None

    # Check that this hardware exists
    present_response = get('hset/details', {'hid': add_json})
    assert present_response.status_code == 200
    # Ensure that hset data has been added properly
    json = present_response.json()
    assert json['desc'] == hset_data['desc']
    assert json['quant'] == hset_data['quant']
    hid = add_json


def test_checkout_hw():
    def checkout_two():
        checkout_data = {'pid': pid, 'hid': hid, 'quant': 2}
        assert post('proj/checkout', checkout_data).status_code == 200  # Sucessful checkout

        # Check that this hardware exists
        present_response = get('hset/details', {'hid': hid})
        assert present_response.status_code == 200
        # Ensure that hset data has been added properly
        json = present_response.json()
        return json['quant']

    assert checkout_two() == 3
    assert checkout_two() == 1


def test_checkout_hw_fail():
    checkout_data = {'pid': pid, 'hid': hid, 'quant': 2}
    assert post('proj/checkout', checkout_data).status_code == 400
    # This request should fail since we have insufficient hw


def test_return_hw():
    def return_two():
        return_data = {'pid': pid, 'hid': hid, 'quant': 2}
        assert post('proj/return', return_data).status_code == 200  # Sucessful return

        # Check that this hardware exists
        present_response = get('hset/details', {'hid': hid})
        assert present_response.status_code == 200
        # Ensure that hset data has been added properly
        json = present_response.json()
        return json['quant']

    assert return_two() == 3
