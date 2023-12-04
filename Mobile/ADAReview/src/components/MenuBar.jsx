import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Account from "../screens/Account";

const home = 'Home';
const search = 'Search';
const account = 'Account';
const Tab = createBottomTabNavigator();

export default function MenuBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;
            if (routeName === home) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routeName === search) {
              iconName = focused ? 'search' : 'search-outline';
            } else if (routeName === account) {
              iconName = focused ? 'person' : 'person-outline';
            }

            const iconStyle = {
              color: focused ? '#003366' : '#FFFFFF',
            };
            const adjustedSize = 35;

            return (
              <Icon
                name={iconName}
                size={adjustedSize}
                color={color}
                style={{
                  color: focused ? '#003366' : '#FFFFFF',
                  alignItems: 'center',
                }}
              />
            );
          },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#354F52',
            alignItems: 'center', // Centrer horizontalement les icônes et les labels
          },
          tabBarLabelStyle: {
            color: '#FFFFFF',
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name={home} component={Home} />
        <Tab.Screen name={search} component={Search} />
        <Tab.Screen name={account} component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
