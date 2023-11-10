import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Switch,ToastAndroid } from 'react-native';
import axios from 'axios';
import url from '../constants/api_url.js'



function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [secret, setSecret] = useState('');

  const  handleSignup = async () => {
    //     url = f'{base_url}/signup'
    // data = {'username': username, 'password': password, 'teacher':1}
    // response = requests.post(url, json=data)
    // return response.json()

    const data = {
        username: username,
        password: password,
        teacher: isTeacher ? "1" : "0", 
        
    };
    
    try{    
      console.log(data)
    // const res = await fetch("https://zenquotes.io/api/quotes/")
    // const data = await res.json()
    // console.log(data)
    
    const response = await axios.post(`${url}/signup`, data);
    ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    if (response.data.success) {
      navigation.navigate('Login');
    }else{
        alert(response.data.message)
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
    }catch(error){
        console.log(error)
        alert(error)
        ToastAndroid.show(error, ToastAndroid.SHORT);
    }

};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
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
        />
      )}
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 8,
  },
});

export default Signup;
