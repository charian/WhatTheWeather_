import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import PropTypes from "prop-types";

class Page1 extends Component {
  
  componentDidMount() {
    //console.log(CustomDrawer.state)
  };

  render () {

      return (
        <View style={styles.container}>
          <Text>
            Page 1
          </Text>
        </View>
      );

  }
}

export default Page1;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})