import PropTypes from 'prop-types';
import React, {Component} from 'react';
//import styles from './SideMenu.style';
import {DrawerItems, DrawerNavigation, NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Dimensions} from 'react-native';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height



class SideMenu extends Component {

  

  navigateToScreen = (route) => () => {

    console.log(this.props.navigation.PageTemp);

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    
  }

  render () {

    const { PageTempStack} = this.props;

    return (
      
      <View style={styles.container}>
        <ScrollView forceInset={{ top: 'always', horizontal: 'true' }} >
          <View>

            <View style={styles.navSectionStyle}>
              <View>
              
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PageTemp')}>
                  Temperature
                </Text>
              </View>
              <View>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                  Air Quaility
                </Text>
              </View>
              <View>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                  Precipitation
                </Text>
              </View>
              <View>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                  SKY
                </Text>
              </View>
              <View>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                  Alarm
                </Text>
              </View>
              <View>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PageSetting')}>
                  Setting
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    zIndex: 20,
    position: 'absolute',
    backgroundColor: '#272727',
    width: 200,
    height: deviceHeight
  },
  navItemStyle: {
    padding: 10,
    //color: '#979797',
    fontSize: 19,
    fontFamily: "Arial Rounded MT Bold",
  },
  navSectionStyle: {
    
  },
  sectionHeadingStyle: {
    paddingVertical: 10
  },
  footerContainer: {
    padding: 20,
    
  }
})