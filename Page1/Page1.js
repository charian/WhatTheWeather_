
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import PropTypes from "prop-types";
import {name} from './../App.js'



class Page1 extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Page 1 {name}
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