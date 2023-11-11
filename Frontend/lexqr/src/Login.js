import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity,ToastAndroid } from 'react-native';
import axios from 'axios';
import url from '../constants/api_url.js'



function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);



  const  handleSignup = async () => {
    if (!username || !password) {
      ToastAndroid.show("Username and password are required", ToastAndroid.SHORT);
      return;
    }
    setUsername(username.trim());
    setPassword(password.trim());
    const data = {
      username: username,
      password: password,
   
    };
      fetch(url + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => response.json())
      .then((data) => {
        if(data.error){
          ToastAndroid.show(data.error, ToastAndroid.SHORT);
          // return;
        }
        else if (data.message == "Login successful") {
          ToastAndroid.show("Signup succesful", ToastAndroid.SHORT);
          // navigation.navigate('Login');
          if (data.user.teacher == 1){
            // navigation.navigate('TeacherHome', {user: data.user});
            // console.log("teacher login successful");
            ToastAndroid.show("teacher login successful", ToastAndroid.SHORT);
            navigation.navigate('Teachers', {username: data.user.username,password:password});
          }else{
            // console.log("student login successful");
            ToastAndroid.show("student login successful", ToastAndroid.SHORT);
            navigation.navigate('Students', {username: data.user.username,password:password});
          }

        } else{
          ToastAndroid.show("Signup Failed", ToastAndroid.SHORT);
        }

      })
      .catch((error) => {
        console.error('Error:', error);
        ToastAndroid.show("Signup Failed", ToastAndroid.SHORT);
      });

      
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or username"
        onChangeText={text => setUsername(text)}
        value={username}
        placeholderTextColor={'black'}

      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholderTextColor={'black'}

      />
      <TouchableOpacity
      onPress={() => navigation.navigate('Signup')}
      >
        <Text style={{
          color: 'blue',
          marginBottom: 20,
        
        }}> don't have account? signup </Text>
      </TouchableOpacity>

      <Button title="Login" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',

  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
    borderRadius: 5,
    
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',

  },
  switchLabel: {
    marginRight: 8,
    color: 'black',

  },
});

export default Login;
