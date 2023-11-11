import React from 'react';
import { Button, View,Text,StyleSheet } from 'react-native';

function Teachers({ route,navigation }) {
  const {username,password} = route.params;
  console.log(username,password);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color:'black'}}>Home Screen {username}</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
}

const styles = StyleSheet.create({

});
export default Teachers;