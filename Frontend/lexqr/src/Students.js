import React from 'react';
import { Button, View,Text, ToastAndroid } from 'react-native';
import api_url from '../constants/api_url';
function Students({ route, navigation }) {
  async function getattendances (){
    const url = api_url + '/getattendances';
    const data = {
      username: username,
      password: password,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error:', error);
      ToastAndroid.show("Error in netowrking", ToastAndroid.SHORT);
    });


  }  

  const {username,password} = route.params;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          color: 'black',
          marginBottom: 20,
        }} >Home Screen {username}</Text>
        <Button
          title="Go to Login"
          // onPress={() => navigation.navigate('Login')}
          onPress={async () => await getattendances()}
        />
      </View>
    );
}

export default Students;