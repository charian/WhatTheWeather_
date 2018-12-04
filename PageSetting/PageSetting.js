import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "../Context";
import SelectLocation from "../location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from 'lodash';
import Modal from "react-native-modal";

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

class PageSetting extends React.Component {
  constructor()
  {
    super();

    this.state={
        TextValue : '',
        endDebounce : null,
        keywordValue: null
    }
  }

  // componentDidUpdate () {

  //   this.setState ({
  //     endDebounce: 'changed'
  //   })
  // }

  onChangeText = (text) => {
    console.log("debouncing");
    this.setState ({
      endDebounce: 'changed! Fetch Start!'
    })
    console.log(this.state.endDebounce + 'Keywords : ' + this.state.keywordValue);
  }
  GetValueFunction = (ValueHolder) =>{
    var Value = ValueHolder.length.toString() ;
    var keyword = ValueHolder;
    this.setState({TextValue : Value});
    this.setState({keywordValue : keyword});
    // if(this.state.TextValue > 3) {
    //   console.log('Fetch Start!');
    // }

   }
  _onChangeTextDelayed = (ValueHolder) => {
    this._onChangeTextDelayed = _.debounce(this.onChangeText, 2000);
  }
 


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundColorinnerContainer}>
          <TextInput 
          style={styles.searchInput} 
          placeholder={'location keywords'}
          onChangeText={
            ValueHolder => {
              this.GetValueFunction(ValueHolder),
              this._onChangeTextDelayed(ValueHolder)
            }
          }
          />
          <Text style={styles.TextStyle}> { this.state.TextValue } </Text>
        </View>
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
    flex: 1,
    padding: 20,
    paddingTop: 110,
    paddingBottom: 25
  },
  backgroundColorinnerContainer: {
    backgroundColor: '#fff',
    flex: 1,
    elevation:4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 26,
    padding: 23
  },
  searchInput: {
    width: '100%',
    height: 60,
    borderColor: '#D9D9D9',
    borderWidth: 3,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 19,
    color: '#373737',
    fontFamily: "Arial Rounded MT Bold",
  }
});
