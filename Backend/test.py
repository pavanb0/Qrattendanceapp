import requests
import time
# Set the base URL of your API
base_url = 'http://192.168.0.104:3000'

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

def attendace(username,password,subject,qr):
    url = f'{base_url}/attendances'
    data = {'username': username, 'password': password,'subject':subject,'qr':qr}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}


# Example usage
if __name__ == '__main__':
    # Test signup
    # time.sleep(1)
    # signup_response = signup('pavan', 'pavan123')
    # print('Signup Response:', signup_response)
    # time.sleep(1)
    # # Test login
    # login_response = login('pavan', 'pavan123')
    # print('Login Response:', login_response)
    # time.sleep(1)
    # # Test setqrcode

    # setqrcode_response = setqrcode('pavan', 'pavan123','1','Maths')
    # print('setqrcode Response:', setqrcode_response)
    # time.sleep(1)
    # Test getqrcode
    # getqrcode_response = getqrcode('pavan', 'pavan123','CHEMISTRY')
    # print('getqrcode Response:', getqrcode_response)

    # test attendance
    #   app.post("/attendances", (req, res) => {
    #   const {username, password,subject,qr} = req.body;
    attendace_response = attendace('pavan', 'pavan123','CHEMISTRY','69422')
    print('attendace Response:', attendace_response)



    # # Test removeqr
    # removeqr_response = removeqr('rhucha', 'goosbumps','1','1')
    # print('removeqr Response:', removeqr_response)


