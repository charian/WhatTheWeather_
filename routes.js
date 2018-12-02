import React, {Component} from 'react';

import PageTemp from './PageTemp/PageTemp';
import Page2 from './Page2/Page2';
import PageSetting from './PageSetting/PageSetting';

import SideMenu from './SideMenu/SideMenu';
import {Button, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

import { WeatherContext } from "./Context";

const globalState ={
  getComponentForState(state) {
    console.log('getComponentForState', state);
  }
  
};
const generateDrawerHamburger = (currentNav ) => {
  const onPress = () => currentNav.navigation.navigate('DrawerOpen');
  return (
    <TouchableOpacity onPress={onPress} style={styles.collLeftbtn}>
        <Image  style={styles.callLeftmenu} source={require('./assets/images/hamburger-2x.png')}/>
    </TouchableOpacity>
  );
};

const getStackNavOption = (current) => ({
  headerStyle: {
    position: 'absolute', 
    backgroundColor: 'transparent', 
    zIndex: 1, 
    top: -100, 
    left: 0, 
    right: 0,
    borderBottomColor: 'transparent'
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  
  headerLeft: generateDrawerHamburger(current)
});

const PageTempStack = StackNavigator({
  PageTemp: {
    screen: PageTemp,
    drawerType: 'back',
    navigationOptions: getStackNavOption,
  }
});
const Page2Stack = StackNavigator({
  Page2: {
    screen: Page2,
    navigationOptions: getStackNavOption
  }
});
const PageSettingStack = StackNavigator({
  PageSetting: {
    screen: PageSetting,
    navigationOptions: getStackNavOption
  }
});

export default DrawerNavigator({
  PageTemp: {
    screen: PageTempStack,
  },
  Page2: {
    screen: Page2Stack
  },
  PageSetting: {
    screen: PageSettingStack
  }
}, {
  contentComponent: SideMenu,
  drawerType: 'slide',
  drawerPosition: 'left',
  drawerWidth: 200,
  flipSide: 'left', 
});

const styles = StyleSheet.create({
  collLeftbtn: {
    position: 'absolute',
    left: 26,
    top: 123
  },
  callLeftmenu: {
      width: 24, height: 20
  }
})
