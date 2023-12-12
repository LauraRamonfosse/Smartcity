// Login.js
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../API/user';
import { fetchBookData } from '../store/dataBaseLoader';

function LoginScreen() {
    // const dispatch = useDispatch();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const token = "";
  
    const APILogin = async () => {
      try {
        const username = 'truc';
        const password = 'coucou123';
        console.log("Tout est ok jusque le token");
        //const token = await login(username, password);
        if (token !== undefined) {
        fetchBookData(dispatch);
        navigation.navigate('MenuBar');
          
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    return (
      <View style={{flex : 1, justifyContent: 'center', alignItems:'center'}}>
        <Button title="Login" onPress={APILogin} />
      </View>
    );
}

export default LoginScreen;
