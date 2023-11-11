import React, { useState } from 'react';
import { TouchableOpacity,Button, View, Text, TextInput, StyleSheet, Switch,ToastAndroid } from 'react-native';
import axios from 'axios';
import url from '../constants/api_url.js'



function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [secret, setSecret] = useState('');
  // setUsername(username.trim());
  // setPassword(password.trim());
  const  handleSignup = async () => {
    if (!username || !password) {
      ToastAndroid.show("Username and password are required", ToastAndroid.SHORT);
      return;
    }
    if (isTeacher && !secret) {
      ToastAndroid.show("Secret is required", ToastAndroid.SHORT);
      return;
    }
    if (isTeacher &&  secret != "9653626784"){
      ToastAndroid.show("Secret is incorrect", ToastAndroid.SHORT);
      return;
    }
    const data = {
      username: username,
      password: password,
      teacher: isTeacher ? 1 : 0,
    };
      fetch(url + '/signup', {
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
        else if (data.message == "User registered successfully") {
          ToastAndroid.show("Signup succesful", ToastAndroid.SHORT);
          navigation.navigate('Login');

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
      <Text style={styles.title}>Signup</Text>
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
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>I am a teacher</Text>
        <Switch
          value={isTeacher}
          onValueChange={value => setIsTeacher(value)}
        />
      </View>
      {isTeacher && (
        <TextInput
          style={styles.input}
          placeholder="Secret"
          onChangeText={text => setSecret(text)}
          value={secret}
          placeholderTextColor={'black'}

        />
      )}

      <Button title="Signup" onPress={handleSignup} />
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={{
          color: 'blue',
          marginBottom: 20,
        
        }}> Already have an account? login </Text>
        </TouchableOpacity>
    
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

export default Signup;
