
import React, {Component} from 'react';
import Router from './routes';
import { View, Text, TouchableHighlight, Image, StyleSheet, AppRegistry } from 'react-native';
import { LinearGradient } from "expo";
import PropTypes from "prop-types";

import {API_KEY} from "./Keys"
import {datagokr_KEY} from "./Keys"
import {kakao_KEY} from "./Keys"
import {token} from "./Keys"


export default class CustomDrawer extends Component {

  state = {
    isLoaded: false,
    error: null,
    isModalVisible: false,
    menuOpen: false,
    locationKey: null,
    temperature: null,
    name: null,
    countrytext: null,
    locationtext: null,
    thenyesterday: null,
    humidity: null,
    cityname: null,
    mtx: null,
    mty: null,
    pmStation: null,
    currentPositionPM25: null,
    currentPositionPM10: null,
  };


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
        console.log(position);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  _getWeather = (lat, long) => {
    //fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=40.730610,-73.935242`)
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${long}`)
      .then(response => response.json())
      .then(location => {
        console.log('location data');
        console.log(location);
        this.setState({
          locationKey: location.Key,
          countrytext: location.Country.LocalizedName,
          locationtext: location.AdministrativeArea.LocalizedName,
          cityname: location.ParentCity.LocalizedName
          //isLoaded: true
        })
        return fetch(`https://dataservice.accuweather.com/currentconditions/v1/` + this.state.locationKey + `?apikey=${API_KEY}&details=true`)
      })
      .then(response => response.json())
      .then(locationData => {
        console.log('weather data');
        console.log(locationData);
        this.setState({
          temperature: locationData[0].Temperature.Metric.Value,
          name: locationData[0].WeatherText.replace(/\s/gi,""), //.replace(/\-/g,'')
          thenyesterday: locationData[0].Past24HourTemperatureDeparture.Metric.Value,
          humidity: locationData[0].RelativeHumidity,
          isLoaded: true
        })

        // return fetch(`https://api.waqi.info/feed/geo:${lat};${long}/?token=${token}`)
        // .then(response => response.json())
        // .then(AQI => {
        //   console.log(AQI);
        // })



        //return fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=-73.935242&y=40.730610&input_coord=WGS84&output_coord=TM`,{
        return fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${long}&y=${lat}&input_coord=WGS84&output_coord=TM`,{
          headers: new Headers({'Authorization': 'KakaoAK d114ff2a6ca1e7124eb497fbfcb660a4'}),
        })
        console.log(locationData[0].WeatherText);
      })
      .then(response => response.json())
      .then(wgsTotm => {
        console.log(wgsTotm);
        this.setState({
          mtx: wgsTotm.documents[0].x,
          mty: wgsTotm.documents[0].y
        })
        console.log(wgsTotm.documents[0].x);
        console.log(wgsTotm.documents[0].y);
        return fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=` + this.state.mtx + `&tmY=` + this.state.mty + `&pageNo=1&numOfRows=10&ServiceKey=${datagokr_KEY}&_returnType=json`)
      })
      .then(response => response.json())
      .then(airkoreadata => {
        console.log(airkoreadata);
        this.setState({
          pmStation: airkoreadata.list[0].stationName
        })
        console.log(airkoreadata.list[0].stationName);
        return fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=` +  encodeURI(this.state.pmStation , "UTF-8") + `&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=${datagokr_KEY}&ver=1.3&_returnType=json`)
        .then(response => response.json())
        .then(airpolution => {
          console.log(airpolution);
          this.setState({
            currentPositionPM25:airpolution.list[0].pm25Value,
            currentPositionPM10:airpolution.list[0].pm10Value
          })
          console.log(airpolution.list[0].pm25Value);
          console.log(airpolution.list[0].pm10Value);
        })
      })
      
  };


  render () {

    const {isLoaded, error, temperature, name, countrytext, locationtext, thenyesterday, humidity, cityname, currentPositionPM10, currentPositionPM25} = this.state;

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
        colors: ["#FEF253", "#FF7300"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny"
      },
      Sunny: {
        colors: ["#FEF253", "#FF7300"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny"
      },
      Partlysunny: {
        colors: ["#FEF253", "#FF7300"],
        title: "Sunny as fuck",
        subtitle: "Go get your ass burnt",
        icon: "weather-sunny"
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
        colors: ["#D7D2CC", "#304352"],
        title: "Clouds",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy"
      },
      Cloudsandsun: {
        colors: ["#D7D2CC", "#304352"],
        title: "Partly cloudy",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy"
      },
      Partlycloudy: {
        colors: ["#D7D2CC", "#304352"],
        title: "Partly cloudy",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy"
      },
      Mostlycloudy: {
        colors: ["#D7D2CC", "#304352"],
        title: "Mostly cloudy",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy"
      },
      Cloudy: {
        colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
        title: "Clouds",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy"
      },
      Someclouds: {
        colors: ["#D7D2CC", "#304352"],
        title: "Some Clouds",
        subtitle: "I know, fucking boring",
        icon: "weather-cloudy"
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
        colors={this.state.name && weatherCases[this.state.name].colors}
        style={styles.linear}
        start={[0.4, -0.4]}
        end={[-0.3, 1]}
        location={[0.25, 0.4, 1]}
      >
        <View style={styles.container}>
          <Router />
          <Text>{this.state.cityname}, {name},{this.state.name && weatherCases[this.state.name].colors} </Text>
          <Text>{this.state.name && weatherCases[this.state.name].colors[0]}</Text>
        </View>
      </LinearGradient>
      //{weatherCases[name].colors}
    );
  }
}


AppRegistry.registerComponent('CustomDrawer', () => CustomDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  linear: {
    flex: 1,   
  }
})


