import requests

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
    url = f'{base_url}/getqrcode'
    data = {'username': username, 'password': password, 'teacher':"1"}
    response = requests.post(url, json=data)
    try:
        return response.json()
    except Exception as e:
        return {'error': 'Invalid response from the server'}
# Example usage
if __name__ == '__main__':
    # Test signup
    # signup_response = signup('rhucha', 'goosbumps')
    # print('Signup Response:', signup_response)

    # Test login
    login_response = login('rhucha', 'goosbumps')
    print('Login Response:', login_response)
