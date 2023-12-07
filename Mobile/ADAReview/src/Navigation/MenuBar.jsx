// ... (other imports)

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import { createStackNavigator } from '@react-navigation/stack';
import BookScreen from '../screens/BookScreen';

const home = 'Home';
const search = 'Search';
const account = 'Account';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name= "Home" component={HomeScreen}/>
      <Stack.Screen name= "Book" component={BookScreen}/>
    </Stack.Navigator>
  );
};


const SearchStack = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name= "Search" component={SearchScreen}/>
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
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          let iconColor = focused ? '#000000' : '#FFFFFF'; // Noir si sélectionné, blanc sinon
          let routeName = route.name;
          if (routeName === home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (routeName === search) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (routeName === account) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
        headerShown : false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#354F52',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          color: '#FFFFFF', // Noir si sélectionné, blanc sinon
        }
        
      })}
    >
      <Tab.Screen name={home} component={HomeStack}/>
      <Tab.Screen name={search} component={SearchStack}/>
      <Tab.Screen name={account} component={AccountStack}/>
    </Tab.Navigator>
  );
};

export default MenuBar;

