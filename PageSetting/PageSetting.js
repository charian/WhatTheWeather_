import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ActivityIndicator,FlatList} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "../Context";
import SelectLocation from "../location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from 'lodash';
import Modal from "react-native-modal";
import {API_KEY} from "./../Keys"

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

class PageSetting extends React.Component {
  constructor()
  {
    super();

    this.state={
        TextValue : '',
        endDebounce : null,
        keywordValue: null,
        isLoading: false,  
        locationList: [], 
    }
  }

  // componentDidUpdate () {

  //   this.setState ({
  //     endDebounce: 'changed'
  //   })
  // }

  onChangeText = (text) => {
    console.log("debouncing");
    
    // console.log('keywords lengh : ' + this.state.TextValue);
    // console.log('keywords value : ' + this.state.keywordValue);
    // console.log({API_KEY});
    if (this.state.TextValue > 2) {
      this.setState ({
        endDebounce: 'changed! Fetch Start!'
      })
      fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=` + this.state.keywordValue)
      .then(response => response.json())
      .then(autocompleteResult => {
        //console.log(autocompleteResult);
        this.setState({
          locationList: autocompleteResult,
          isLoading: false,  
        })
        console.log(this.state.locationList[0].LocalizedName);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    console.log(this.state.endDebounce + 'Keywords : ' + this.state.keywordValue);
  }

  componentDidUpate(){
    
  }

  GetValueFunction = (ValueHolder) =>{
    var Value = ValueHolder.length.toString(); // 입력한 글자를 받아와 length를 구함.
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
          <View style={styles.containerremarkOfSearch}>
            <Text style={styles.remarkOfSearch}>
              Please enter at least 3 characters.
            </Text>
          </View>
          <FlatList
            data={this.state.locationList}
            renderItem={({item}) =>
              <View style={styles.locationList}>
                <Text style={styles.locationListText}>{item.LocalizedName}, {item.Country.LocalizedName}</Text>
              </View>
            }
            keyExtractor={(item, index) => index}
          />
          {/* <Text style={styles.TextStyle}> { this.state.TextValue } </Text> */}
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
  containerremarkOfSearch: {
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  remarkOfSearch: {
    color: '#373737',
    fontFamily: "NanumSquareRoundEB",
    fontSize: 13,
    
  },
  locationList: {
    padding: 15
  },
  locationListText: {
    fontSize: 16,
    color: '#373737',
    fontFamily: "NanumSquareRoundEB",
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
    fontFamily: "NanumSquareRoundEB",
  }
});
