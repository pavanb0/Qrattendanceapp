import React from 'react';
import { Button, View,Text } from 'react-native';

function Teachers({ route,navigation }) {
  const {user} = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen {user}</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
}

export default Teachers;