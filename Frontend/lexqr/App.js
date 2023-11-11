import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Students from './src/Students';
import Login from './src/Login';
import Teachers from './src/Teachers';
import Signup from './src/Signup';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>

      <Stack.Screen name="Teachers" component={Teachers}
        options={({ route }) => ({ title: "Welcome "+ route.params.username,
        headerStyle: {
          backgroundColor: '#3b2824',
        },
        headerTintColor: '#fff',
        headerLeft: null,
        // add a Touchable opacity to the header right
        
      })}
      />
     
      <Stack.Screen name="Students" component={Students}
        options={({ route }) => ({ title: "Welcome "+ route.params.username,
        headerStyle: {
          backgroundColor: '#444654',
        },
        headerTintColor: '#fff',
        headerLeft: null,
        // add a Touchable opacity to the header right
        
      })}
      />

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