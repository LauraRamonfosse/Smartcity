// Layout.js
import React from 'react';
import { View, StatusBar } from 'react-native';
import MenuBar from './components/MenuBar';

const Layout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {children}
      <MenuBar />
    </View>
  );
};

export default Layout;
