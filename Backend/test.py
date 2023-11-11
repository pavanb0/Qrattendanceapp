import requests
import time
# Set the base URL of your API
base_url = 'http://192.168.0.104:3030'

# Function to create a new user account
def signup(username, password):
    url = f'{base_url}/signup'
    data = {'username': username, 'password': password, 'teacher':1}
    response = requests.post(url, json=data)
    return response.json()

# Function to log in with a user account
def login(username, password):
    url = f'{base_url}/login'
    data = {'username': username, 'password': password, 'teacher':"1"}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}
    

# app.post("/setqrcode",(req,res) => {
#     const { username, password,teacher,subject} = req.body;
def setqrcode(username,password,teacher,subject):
    url = f'{base_url}/setqrcode'
    data = {'username': username, 'password': password, 'teacher':teacher,'subject':subject}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}


# app.post('/removeqr',(req,res) => {
#   const { username, password,teacher,subject} = req.body;
def removeqr(username,password,teacher,subject):
    url = f'{base_url}/removeqr'
    data = {'username': username, 'password': password, 'teacher':teacher,'subject':subject}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}
    
# app.post("/getqrcode",(req,res) => {
#   const { username, password,subject} = req.body;

def getqrcode(username,password,subject):
    url = f'{base_url}/getqrcode'
    data = {'username': username, 'password': password,'subject':subject}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}


# app.post("/attendances", (req, res) => {
#   const {username, password,subject,qr} = req.body;


#    const url = api_url + '/getattendancesteacher';
#     const data = {
#       username: username,
#       password: password,
#       subject: subject,

def getattendancesteacher(username,password,subject):
    url = f'{base_url}/getattendancesteacher'
    data = {'username': username, 'password': password,'subject':subject}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}


def attendace(username,password,qr):
    url = f'{base_url}/setattendances'
    data = {'username': username, 'password': password,'qr':qr}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}

# app.post("/getattendances", (req, res) => {
#   const {username, password} = req.body;
#   if (!username || !password) {

def getattendances(username,password):
    url = f'{base_url}/getattendances'
    data = {'username': username, 'password': password}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}


# Example usage
if __name__ == '__main__':
    # Test signup
    # # time.sleep(1)
    # signup_response = signup('Ritesh', 'pavan123')
    # print('Signup Response:', signup_response)
    # # time.sleep(1)
    # # # Test login
    # login_response = login('Ritesh', 'pavan123')
    # print('Login Response:', login_response)
    # # time.sleep(1)
    # # # Test setqrcode

    # setqrcode_response = setqrcode('Ritesh', 'pavan123','1','Maths')
    # print('setqrcode Response:', setqrcode_response)
    # # time.sleep(1)
    # # Test getqrcode
    # getqrcode_response = getqrcode('Ritesh', 'pavan123','Biology')
    # print('getqrcode Response:', getqrcode_response)

    # test attendance
    #   app.post("/attendances", (req, res) => {
    #   const {username, password,subject,qr} = req.body;

    # attendace_response = attendace('ritesh', 'pavan1234','252571')
    # print('attendace Response:', attendace_response)

    # # Test getattendancesteacher
    getattendancesteacher_response = getattendancesteacher('pavan', 'pavan1234','Surajtech')
    print('getattendancesteacher Response:', getattendancesteacher_response)

    # # Test getattendances
    # getattendances_response = getattendances('ritesh', 'pavan1234')
    # print('getattendances Response:', getattendances_response)


    # # Test removeqr
    # removeqr_response = removeqr('rhucha', 'goosbumps','1','1')
    # print('removeqr Response:', removeqr_response)


