import React from 'react';
import { Button, View,Text } from 'react-native';

function Students({ route, navigation }) {
  const {user} = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          color: 'black',
          marginBottom: 20,
        }} >Home Screen {user}</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
}

export default Students;