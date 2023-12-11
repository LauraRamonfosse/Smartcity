import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import MenuBar from './MenuBar';
import LoginScreen from '../screens/LoginScreen';
import BookScreen from '../screens/BookScreen.jsx';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const Navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MenuBar" component={MenuBar} options={{ headerShown: false }} />
        </Stack.Navigator>
        <StatusBar barStyle="dark-content"/>
      </NavigationContainer>
    );
  };

export default Navigation;
