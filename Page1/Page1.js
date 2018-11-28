import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "../Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Modal from "react-native-modal";


export class Page1 extends Component {

  state = { 
    isModalVisible1: false,
  }

  _toggleModal1 = () => this.setState({ isModalVisible1: !this.state.isModalVisible1 });

  render() {
    
    const weatherCases = {
      Lightrain: {
        colors: ["#00C6FB", "#005BEA"],
        title: "Light Raining",
        subtitle: "For more info look outside",
        icon: "weather-rainy"
        },
      Rain: {
        colors: ["#00C6FB", "#005BEA"],
        title: "Raining like a MF",
        subtitle: "For more info look outside",
        icon: "weather-rainy"
      },
      Clear: {
        colors: ["#80CBF9", "#EED578", "#FF4B1F"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny",
        iconImg: require('./../assets/images/icon-sunny-2x.png'),
        width: 243,
        height: 234,
      },
      Sunny: {
        colors: ["#80CBF9", "#EED578", "#FF4B1F"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny",
        iconImg: require('./../assets/images/icon-sunny-2x.png'),
        width: 243,
        height: 234,
      },
      Partlysunny: {
        colors: ["#80CBF9", "#F3D66B", "#FF4B1F"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny",
        iconImg: require('./../assets/images/icon-sunny-2x.png'),
        width: 243,
        height: 234,
      },
      Mostlysunny: {
        colors: ["#FEF253", "#FF7300"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny"
      },
      Mostlyclear: {
        colors: ["#FEF253", "#FF7300"],
        title: "Mostly Clear",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny"
      },
      Thunderstorm: {
        colors: ["#00ECBC", "#007ADF"],
        title: "Thunderstorm in the house",
        subtitle: "Actually, outside of the house",
        icon: "weather-lightning"
      },
      Clouds: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Clouds",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy",
        iconImg: require('./../assets/images/icon-cloud-2x.png'),
        width: 244,
        height: 157,
      },
      Cloudsandsun: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Partly cloudy",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy",
        iconImg: require('./../assets/images/icon-cloud-2x.png'),
        width: 244,
        height: 157,
      },
      Partlycloudy: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Partly cloudy",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy",
        iconImg: require('./../assets/images/icon-cloud-2x.png'),
        width: 244,
        height: 157,
      },
      Mostlycloudy: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Mostly cloudy",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy",
        iconImg: require('./../assets/images/icon-cloud-2x.png'),
        width: 244,
        height: 157,
      },
      Cloudy: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Clouds",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy",
        iconImg: require('./../assets/images/icon-cloud-2x.png'),
        width: 244,
        height: 157,
      },
      Someclouds: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Some Clouds",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy",
        iconImg: require('./../assets/images/icon-cloud-2x.png'),
        width: 244,
        height: 157,
      },
      Snow: {
        colors: ["#7DE2FC", "#B9B6E5"],
        title: "Cold as balls",
        subtitle: "Do you want to build a snowman? Fuck no.",
        icon: "weather-snowy"
      },
      Drizzle: {
        colors: ["#89F7FE", "#66A6FF"],
        title: "Drizzle",
        subtitle: "Is like rain, but gay 🏳️‍🌈",
        icon: "weather-hail"
      },
      Haze: {
        colors: ["#89F7FE", "#66A6FF"],
        title: "Haze",
        subtitle: "Don't know what that is 💩",
        icon: "weather-hail"
      },
      Mist: {
        colors: ["#D7D2CC", "#304352"],
        title: "Mist!",
        subtitle: "It's like you have no glasses on.",
        icon: "weather-fog"
      },
      Ashower: {
        colors: ["#D7D2CC", "#304352"],
        title: "Mist!",
        subtitle: "It's like you have no glasses on.",
        icon: "weather-fog"
      }
    };

    // const images = {
    //   motlyCloudy: require('./../assets/images/icon-cloud-2x.png'),
    // };
    // console.log(Images.motlyCloudy);
    // console.log('state' + this.state.weatherName);
    // console.log('props' + this.props.value.name);
    
    //console.log(weatherCases[weatherName].iconImg);

    //console.log('!!!' + weatherName);
    //const {weatherName}  = this.state;

    //console.log('props' + weatherCases[this.props.value.name].colors);
    //console.log('state' + weatherCases[this.state.weatherName].colors);
   
    //console.log(weatherName);
    
    //console.log(this.state.isModalVisible1);

    return (

      <LinearGradient
        //colors={this.props.value.name ? weatherCases[this.props.value.name].colors: ["#000000", "#111111"]}//{["#BEBEBE", "#7C8EB6", "#6F6F6F"]}//
        colors={weatherCases[this.props.value.name].colors}
        style={styles.linear}
        start={[0.6, 0]}
        end={[0.3, 0.9]}
        locations={[0.0, 0.6 ,1.0]}
      >

        <View style={styles.upper}>
          <Image 
            source={weatherCases[this.props.value.name].iconImg}
            style={{
              width: weatherCases[this.props.value.name].width, 
              height: weatherCases[this.props.value.name].height
            }}
          />
        </View>
        <View style={styles.lower}>
          <View style={styles.lowerDgree}>
            <Text style={styles.currentTemp}>{this.props.value.temperature}</Text>
            <Text style={styles.currentTempDeg}>º</Text>
            <Text style={styles.currentReal}>/ {this.props.value.realFeel}</Text>
            <Text style={styles.currentRealDeg}>º</Text>
            <TouchableOpacity onPress={this._toggleModal1 } style={styles.locationTitle}>
              <Image source={require('./../assets/images/badge-realfeel-2x.png')} style={styles.realFeelBadge} />
            </TouchableOpacity>
            <Modal 
            isVisible={this.state.isModalVisible1} 
            animationIn='bounceIn'
            easing='ease-in'
            animationOut='fadeOut' 
            backdropOpacity={0.3}
            >
              <View style={styles.modalContainer}>
                <View>
                  <Text>Current Location</Text>
                </View>
                <View>
                  <Text>Any Added Location</Text>
                </View>
                <TouchableOpacity onPress={this._toggleModal1}>
                  <Text>Hide me!</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View  style={styles.tempYesterday}>
              <Text  style={styles.tempYesterdayText}>
                Temperature is {this.props.value.thenyesterday}º then yesterday
              </Text>
            </View>
          </View>
          
          <View style={styles.lowerEtc}>
            <Text>{this.props.value.name}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default () => (
  <WeatherContext.Consumer>
    {value => <Page1 value={value} />}
  </WeatherContext.Consumer>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    marginTop: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  linear: {
    flex: 1,   
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  lower: {
    flex: 1,
    paddingLeft: 25,
    alignItems: "flex-start",
  },
  lowerDgree: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 90,
    marginBottom: 60
  },
  tempYesterday: {
    flex: 1,
    height: 15,
    position: 'absolute',
    left: 0,
    bottom: -9
  },
  tempYesterdayText: {
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
  },
  lowerEtc: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  currentTemp: {
    fontSize: 80,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
  },
  currentReal: {
    fontSize: 45,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginLeft: 8,
    marginTop: 30,
  },
  currentTempDeg: {
    fontSize: 50,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
  },
  currentRealDeg: {
    fontSize: 30,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginTop: 30,
  },
  realFeelBadge: {
    width: 61,
    height: 19,
    marginTop: 55,
    marginLeft: 8
  },
  modalContainer: {
    backgroundColor: '#fff',
    elevation:4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 99
  },
});