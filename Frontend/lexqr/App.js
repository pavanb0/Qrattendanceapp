import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Students from './src/Students';
import Login from './src/Login';
import Teachers from './src/Teachers';
import Signup from './src/Signup';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="Teachers" component={Teachers} />
      <Stack.Screen name="Students" component={Students} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
// Path: Frontend/QrCheckMe/src/Login.js 