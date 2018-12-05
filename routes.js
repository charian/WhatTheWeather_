import React, {Component} from 'react';

import PageTemp from './PageTemp/PageTemp';
import Page2 from './Page2/Page2';
import PageSetting from './PageSetting/PageSetting';

import SideMenu from './SideMenu/SideMenu';
import {Button, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper'

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
    // zIndex: 2000, 
    top: 0, 
    left: 0, 
    right: 0,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  
  
  headerLeft: generateDrawerHamburger(current)
});

const PageTempStack = StackNavigator({
  PageTemp: {
    screen: PageTemp,
    //headerMode: 'float',
    navigationOptions:  getStackNavOption
    
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

// drawer stack
const DrawerStack = DrawerNavigator({
  PageTemp: { screen: PageTemp },
  Page2: { screen: Page2 },
  PageSetting: { screen: PageSetting },
})

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
  contentOptions: {
    activeTintColor: '#ffffff',
    activeBackgroundColor: 'white',
    inactiveTintColor: 'white'
  },
  
});

const styles = StyleSheet.create({
  collLeftbtn: {
    // position: 'absolute',
    // left: 26,
    // top: 0,
    // zIndex: 105,
    marginLeft: 30,
    marginTop: 15,
  },
  callLeftmenu: {
      width: 24, height: 20
  }
})
