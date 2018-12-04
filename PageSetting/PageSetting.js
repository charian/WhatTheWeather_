import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "../Context";
import SelectLocation from "../location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from 'lodash';
import Modal from "react-native-modal";


class PageSetting extends React.Component {
  constructor()
  {
    super();
  
    this.state={
  
      TextValue : ''
  
    }
  }

  GetValueFunction = (ValueHolder) =>{
      
    var Value = ValueHolder.length.toString() ;

    this.setState({TextValue : Value}) ;
  
   }

  onChangeText(text) {
    console.log("debouncing");
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 150}}>
      <TextInput 
        style={{width: 300, height: 30, borderColor: 'gray', borderWidth: 1}} 
        placeholder={'location keywords'}
        onChangeText={
          _.debounce(this.onChangeText, 2000)
        }
        onChangeText={ 
          ValueHolder => this.GetValueFunction(ValueHolder) 
        }
      />
      <Text style={styles.TextStyle}> { this.state.TextValue } </Text>
      </View>
    )
  }
}
export default () => (
  <WeatherContext.Consumer>
    {value => <PageSetting value={value} />}
  </WeatherContext.Consumer>
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 150
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});
