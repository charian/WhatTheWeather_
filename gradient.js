import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "./Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
export class GradientBackground extends Component {

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
          iconImg: require('./assets/images/icon-sunny-2x.png'),
          width: 243,
          height: 234,
        },
        Sunny: {
          colors: ["#80CBF9", "#EED578", "#FF4B1F"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny",
          iconImg: require('./assets/images/icon-sunny-2x.png'),
          width: 243,
          height: 234,
        },
        Partlysunny: {
          colors: ["#80CBF9", "#F3D66B", "#FF4B1F"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny",
          iconImg: require('./assets/images/icon-sunny-2x.png'),
          width: 243,
          height: 234,
        },
        Mostlysunny: {
          colors: ["#80CBF9", "#EED578", "#FF4B1F"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny",
          iconImg: require('./assets/images/icon-sunny-2x.png'),
          width: 243,
          height: 234,
        },
        Mostlyclear: {
          colors: ["#80CBF9", "#EED578", "#FF4B1F"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny",
          iconImg: require('./assets/images/icon-sunny-2x.png'),
          width: 243,
          height: 234,
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
          iconImg: require('./assets/images/icon-cloud-2x.png'),
          width: 244,
          height: 157,
        },
        Cloudsandsun: {
          colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
          title: "Partly cloudy",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy",
          iconImg: require('./assets/images/icon-cloud-2x.png'),
          width: 244,
          height: 157,
        },
        Partlycloudy: {
          colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
          title: "Partly cloudy",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy",
          iconImg: require('./assets/images/icon-cloud-2x.png'),
          width: 244,
          height: 157,
        },
        Mostlycloudy: {
          colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
          title: "Mostly cloudy",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy",
          iconImg: require('./assets/images/icon-cloud-2x.png'),
          width: 244,
          height: 157,
        },
        Cloudy: {
          colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
          title: "Clouds",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy",
          iconImg: require('./assets/images/icon-cloud-2x.png'),
          width: 244,
          height: 157,
        },
        Someclouds: {
          colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
          title: "Some Clouds",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy",
          iconImg: require('./assets/images/icon-cloud-2x.png'),
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

    return (

        <LinearGradient
        //colors={this.props.value.name ? weatherCases[this.props.value.name].colors: ["#000000", "#111111"]}//{["#BEBEBE", "#7C8EB6", "#6F6F6F"]}//
        colors={weatherCases[this.props.value.name].colors}
        style={styles.linear}
        start={[0.6, 0]}
        end={[0.3, 0.9]}
        locations={[0.0, 0.6 ,1.0]}
      >
                <Image 
            source={weatherCases[this.props.value.name].iconImg}
            style={{
              width: weatherCases[this.props.value.name].width, 
              height: weatherCases[this.props.value.name].height,
              alignSelf: 'center'
            }}
          />
      </LinearGradient>   

    );
  }
}

export default () => (
  <WeatherContext.Consumer>
    {value => <GradientBackground value={value} />}
  </WeatherContext.Consumer>
);

const styles = StyleSheet.create({
    linear: {
        position: 'absolute', height: height, width: width, top: 0, left: 0, zIndex: 1
      },
});