// ... (other imports)

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import { createStackNavigator } from '@react-navigation/stack';
import BookScreen from '../screens/BookScreen';
import { Text } from 'react-native-elements';
import ReviewScreen from '../screens/ReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReviewFormScreen from '../screens/ReviewFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name= "Home" component={HomeScreen} />
      <Stack.Screen name= "Book" component={BookScreen}/>
      <Stack.Screen name = "Review" component ={ReviewScreen}/>
      <Stack.Screen name = "ReviewForm" component ={ReviewFormScreen}/>
    </Stack.Navigator>
  );
};


const SearchStack = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name= "Search" component={SearchScreen}/>
      <Stack.Screen name= "Book" component={BookScreen}/>
      <Stack.Screen name= "Profile" component={ProfileScreen}/>
      <Stack.Screen name = "Review" component ={ReviewScreen}/>
    </Stack.Navigator>
  );
};

const AccountStack = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name= "Account" component={AccountScreen}/>
    </Stack.Navigator>
  );
};
const MenuBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={() => ({

        headerShown : false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#070D0E',
        // tabBarActiveBackgroundColor : '#1E3335',
        tabBarStyle: {
          backgroundColor: '#354F52',
          height:90,
        },
        tabBarItemStyle :{
          opacity :90,
        },
        
      })}
    >
      <Tab.Screen 
        name={"HomeStack"} 
        component={HomeStack} 
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color }}>
              {focused ? 'Acceuil' : 'Acceuil'}
            </Text>
          ),
          tabBarIcon:(({color, focused}) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={30} style={{color: color}}/>
          ))
        }}
      />
      <Tab.Screen 
        name={"SearchStack"} 
        component={SearchStack} 
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color }}>
              {focused ? 'Rechercher' : 'Rechercher'}
            </Text>
          ),
          tabBarIcon:(({color, focused}) => (
            <Icon name={focused ? 'search' : 'search-outline'}size={30} style={{color: color}}/>
          ))
        }}
      />
      <Tab.Screen 
        name={"AccountStack"} 
        component={AccountStack} 
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: color }}>
              {focused ? 'Compte' : 'Compte'}
            </Text>
          ),
          tabBarIcon:(({color, focused}) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={30} style={{color: color}}/>
          ))
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuBar;

