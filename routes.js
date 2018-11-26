import React, {Component} from 'react';

import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import Page3 from './Page3/Page3';

import SideMenu from './SideMenu/SideMenu';
import {Button, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';


const generateDrawerHamburger = (currentNav) => {
  const onPress = () => currentNav.navigation.navigate('DrawerOpen');
  return (
    <TouchableOpacity onPress={onPress}>
        <Image  style={styles.callLeftmenu} source={require('./assets/images/hamburger-2x.png')}/>
    </TouchableOpacity>
  );
};

const getStackNavOption = (current) => ({
  headerStyle: {
    position: 'absolute', 
    backgroundColor: 'transparent', 
    zIndex: 100, 
    top: 0, 
    left: 0, 
    right: 0,
    borderBottomColor: 'transparent'
  },
  headerLeft: generateDrawerHamburger(current)
});

const Page1Stack = StackNavigator({
  Page1: {
    screen: Page1,
    navigationOptions: getStackNavOption,
  }
});
const Page2Stack = StackNavigator({
  Page2: {
    screen: Page2,
    navigationOptions: getStackNavOption
  }
});
const Page3Stack = StackNavigator({
  Page3: {
    screen: Page3,
    navigationOptions: getStackNavOption
  }
});

export default DrawerNavigator({
  Page1: {
    screen: Page1Stack,
    backgroundColor: 'transparent',
  },
  Page2: {
    screen: Page2Stack
  },
  Page3: {
    screen: Page3Stack
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 200
});

const styles = StyleSheet.create({
    callLeftmenu: {
        width: 24, height: 20
    }
})
