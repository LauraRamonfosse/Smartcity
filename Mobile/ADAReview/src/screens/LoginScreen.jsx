// Login.js
import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { fetchBookData } from '../store/dataBaseLoader';
// import { login } from '../API/user';

function LoginScreen() {
    const navigation = useNavigation();
  
    const APILogin = async () => {
      try {
        const username = 'truc';
        const password = 'coucou123';
        console.log("Tout est ok jusque le token");
        const token = "ok";

        if (token !== undefined) {
          // await fetchBookData(dispatch, token);
          navigation.navigate('MenuBar');
          
        } else {
          Alert.alert('Wrong username or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Server error');
      }
    };
  
    return (
      <View style={{flex : 1, justifyContent: 'center', alignItems:'center'}}>
        <Button title="Login" onPress={APILogin} />
      </View>
    );
}

export default LoginScreen;
