// Login.js
import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    // const dispatch = useDispatch();
    const navigation = useNavigation();
  
    const APILogin = async () => {
      try {
        const username = 'truc';
        const password = 'coucou123';
        const token = "ok";
        // Assuming you have an asynchronous login function
        // const token = await login(username, password);
  
        if (token !== undefined) {
          console.log('Token Login:', token);
          // dispatch(setToken(token));
          // await loadDataBase(dispatch, token);
          
          // Dispatch an action to update the isLoggedIn state to true

          console.log('Login done');
  
          // Utilize navigation.navigate to go to the next screen (for example, MenuBar)
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
