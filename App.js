
import React, {Component} from 'react';
import Router from './routes';
import { View, Text, TouchableOpacity, Image, StyleSheet, AppRegistry, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { ifIphoneX } from 'react-native-iphone-x-helper'


import SelectLocation from "./location";
import { WeatherContext } from "./Context";
import {API_KEY} from "./Keys"
import {datagokr_KEY} from "./Keys"
import {kakao_KEY} from "./Keys"
import {token} from "./Keys"

// export const dataGlobal = {
//   globalName : name
  
// }
const weatherCases = {
  Lightrain: {
    colors: ["#80CBF9", "#EED578", "#FF4B1F"],
    title: "Sunny as fuck",
    subtitle: "Go get your ass burnt",
    icon: "weather-sunny",
    iconImg: require('./assets/images/icon-sunny-2x.png'),
    width: 243,
    height: 234,
    },
  Rain: {
    colors: ["#80CBF9", "#EED578", "#FF4B1F"],
    title: "Sunny as fuck",
    subtitle: "Go get your ass burnt",
    icon: "weather-sunny",
    iconImg: require('./assets/images/icon-sunny-2x.png'),
    width: 243,
    height: 234,
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

export default class WhatTheWeather extends Component {

  state = {
      isLoaded: false,
      error: null,
      isModalVisible: false,
      menuOpen: false,
      countryID: null,
      locationKey: null,
      temperature: null,
      realFeel: null,
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
      currentPositionPM2524: null,
      currentPositionPM1024: null,
      isDaytime: null,
      aqi: null,
      PM25currentAqi: null,
      PM25currentAqiLevel: null,
      PM10currentAqi: null,
      PM10currentAqiLevel: null,
      AQIResult: null,
      polutionStandard: null,
      AQILevelResult: null,
      gradientColors: null,
      weatherImageWidth: null,
      weatherImageHeight: null,
      thenYesterdayCompare: null,
    };
  


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
        //console.log(position);
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
        //console.log('location data');
        //console.log(location);
        this.setState({
          locationKey: location.Key,
          countrytext: location.Country.LocalizedName,
          countryID: location.Country.ID,
          locationtext: location.AdministrativeArea.LocalizedName,
          cityname: location.ParentCity.LocalizedName
          //isLoaded: true
        })
        return fetch(`https://dataservice.accuweather.com/currentconditions/v1/` + this.state.locationKey + `?apikey=${API_KEY}&details=true`)
      })
      .then(response => response.json())
      .then(locationData => {
        //console.log('weather data');
        //console.log(locationData);
        this.setState({
          temperature: Math.round(locationData[0].Temperature.Metric.Value),
          name: locationData[0].WeatherText.replace(/\s/gi,""), //.replace(/\-/g,'')
          thenyesterday: locationData[0].Past24HourTemperatureDeparture.Metric.Value,
          humidity: locationData[0].RelativeHumidity,
          isDaytime: locationData[0].IsDayTime,
          realFeel: Math.round(locationData[0].RealFeelTemperature.Metric.Value),

          weatherImage: locationData[0].WeatherText.replace(/\s/gi,"") && weatherCases[locationData[0].WeatherText.replace(/\s/gi,"")].iconImg,
          weatherImageWidth: locationData[0].WeatherText.replace(/\s/gi,"") && weatherCases[locationData[0].WeatherText.replace(/\s/gi,"")].width,
          weatherImageHeight: locationData[0].WeatherText.replace(/\s/gi,"") && weatherCases[locationData[0].WeatherText.replace(/\s/gi,"")].height,
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
        //console.log(locationData[0].WeatherText);
      })
      .then(response => response.json())
      .then(wgsTotm => {
        //console.log(wgsTotm);
        this.setState({
          mtx: wgsTotm.documents[0].x,
          mty: wgsTotm.documents[0].y
        })
        //console.log(wgsTotm.documents[0].x);
        //console.log(wgsTotm.documents[0].y);
        return fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=` + this.state.mtx + `&tmY=` + this.state.mty + `&pageNo=1&numOfRows=10&ServiceKey=${datagokr_KEY}&_returnType=json`)
      })
      .then(response => response.json())
      .then(airkoreadata => {
        //console.log(airkoreadata);
        this.setState({
          pmStation: airkoreadata.list[0].stationName
        })
        //console.log(airkoreadata.list[0].stationName);
        return fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=` +  encodeURI(this.state.pmStation , "UTF-8") + `&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=${datagokr_KEY}&ver=1.3&_returnType=json`)
        .then(response => response.json())
        .then(airpolution => {
          //console.log(airpolution);
          this.setState({
            currentPositionPM25:airpolution.list[0].pm25Value,
            currentPositionPM2524:airpolution.list[0].pm25Value24,
            currentPositionPM10:airpolution.list[0].pm10Value,
            currentPositionPM1024:airpolution.list[0].pm10Value24,
          })

          console.log('pm2.5 : ' + this.state.currentPositionPM25);
          console.log('pm2.5 24h : ' + this.state.currentPositionPM2524);
          console.log('pm10 : ' +  this.state.currentPositionPM10);
          console.log('pm10 24h : ' +  this.state.currentPositionPM1024);

          if(this.state.currentPositionPM2524 < 12) {
            this.setState({
              PM25currentAqi: (2.10 * this.state.currentPositionPM25) - (2.10 * 0) + 0
            });
          } else if (this.state.currentPositionPM2524 < 35.4) {
            this.setState({
              PM25currentAqi: (2.10 * this.state.currentPositionPM25) - (2.10 * 12.1) + 51
            });
          } else if (this.state.currentPositionPM2524 < 55.4) {
            this.setState({
              PM25currentAqi: (2.462 * this.state.currentPositionPM25) - (2.462 * 35.5) + 101
            });
          } else if (this.state.currentPositionPM2524 < 150.4) {
            this.setState({
              PM25currentAqi: (0.561 * this.state.currentPositionPM25) - (0.516 * 55.5) + 151
            });
          } else if (this.state.currentPositionPM2524 < 250.4) {
            this.setState({
              PM25currentAqi: (0.99 * this.state.currentPositionPM25) - (0.99 * 150.5) + 151
            });
          } else if (this.state.currentPositionPM2524 < 350.4) {
            this.setState({
              PM25currentAqi: (0.99 * this.state.currentPositionPM25) - (0.99 * 250.5) + 151
            });
          } else if (this.state.currentPositionPM2524 < 500.4) {
            this.setState({
              PM25currentAqi: (0.66 * this.state.currentPositionPM25) - (0.66 * 350.5) + 151
            });
          }
          if(this.state.PM25currentAqi < 50) {
            this.setState({
              PM25currentAqiLevel: 'Good'
            });
          } else if (this.state.PM25currentAqi < 100) {
            this.setState({
              PM25currentAqiLevel: 'Moderate'
            });
          } else if (this.state.PM25currentAqi < 150) {
            this.setState({
              PM25currentAqiLevel: 'Unhealthy for Sensitive Groups'
            });
          } else if (this.state.PM25currentAqi < 200) {
            this.setState({
              PM25currentAqiLevel: 'Unhealthy'
            });
          } else if (this.state.PM25currentAqi < 300) {
            this.setState({
              PM25currentAqiLevel: 'Very Unhealthy'
            });
          } else if (this.state.PM25currentAqi < 400) {
            this.setState({
              PM25currentAqiLevel: 'Hazardous'
            });
          } else if (this.state.PM25currentAqi < 500) {
            this.setState({
              PM25currentAqiLevel: 'Hazardous Level 2'
            });
          }

          if(this.state.currentPositionPM1024 < 54) {
            this.setState({
              PM10currentAqi: (0.9259 * this.state.currentPositionPM10) - (0.9259 * 0) + 0
            });
          } else if (this.state.currentPositionPM1024 < 154) {
            this.setState({
              PM10currentAqi: (0.4949 * this.state.currentPositionPM10) - (0.4949 * 55) + 51
            });
          } else if (this.state.currentPositionPM1024 < 254) {
            this.setState({
              PM10currentAqi: (0.4949 * this.state.currentPositionPM10) - (0.4949 * 155) + 101
            });
          } else if (this.state.currentPositionPM1024 < 354) {
            this.setState({
              PM10currentAqi: (0.4949 * this.state.currentPositionPM10) - (0.4949 * 255) + 151
            });
          } else if (this.state.currentPositionPM1024 < 424) {
            this.setState({
              PM10currentAqi: (1.434 * this.state.currentPositionPM10) - (1.434 * 355) + 151
            });
          } else if (this.state.currentPositionPM1024 < 504) {
            this.setState({
              PM10currentAqi: (1.253 * this.state.currentPositionPM10) - (1.253 * 425) + 151
            });
          } else if (this.state.currentPositionPM1024 < 604) {
            this.setState({
              PM10currentAqi: (1 * this.state.currentPositionPM10) - (1 * 505) + 151
            });
          }


          if(this.state.PM10currentAqi < 50) {
            this.setState({
              PM10currentAqiLevel: 'Good'
            });
          } else if (this.state.PM10currentAqi < 100) {
            this.setState({
              PM10currentAqiLevel: 'Moderate'
            });
          } else if (this.state.PM10currentAqi < 150) {
            this.setState({
              PM10currentAqiLevel: 'Unhealthy for Sensitive Groups'
            });
          } else if (this.state.PM10currentAqi < 200) {
            this.setState({
              PM10currentAqiLevel: 'Unhealthy'
            });
          } else if (this.state.PM10currentAqi < 300) {
            this.setState({
              PM10currentAqiLevel: 'Very Unhealthy'
            });
          } else if (this.state.PM10currentAqi < 400) {
            this.setState({
              PM10currentAqiLevel: 'Hazardous'
            });
          } else if (this.state.PM10currentAqi < 500) {
            this.setState({
              PM10currentAqiLevel: 'Hazardous Level 2'
            });
          }

          console.log('PM 2.5 AQI : ' + this.state.PM25currentAqi + ' ' +this.state.PM25currentAqiLevel);
          console.log('PM 10 AQI : ' + this.state.PM10currentAqi + ' ' +this.state.PM10currentAqiLevel);
        
          if (this.state.PM25currentAqi > this.state.PM10currentAqi) {
            this.setState({
              AQIResult: this.state.PM25currentAqiLevel,
              polutionStandard: 'PM 2.5',
              AQILevelResult: this.state.PM25currentAqi
            })
            console.log(this.state.polutionStandard + ' ' + this.state.PM25currentAqi + ' ' + this.state.AQIResult);
          } else {
            this.setState({
              AQIResult: this.state.PM10currentAqiLevel,
              polutionStandard: 'PM 10',
              AQILevelResult: this.state.PM10currentAqi
            })
            console.log(this.state.polutionStandard + ' ' + this.state.PM10currentAqi + ' ' + this.state.AQIResult);
          }

          if (this.state.thenyesterday > 0) {
            this.setState({
              thenYesterdayCompare: 'higher then yesterday'
            })
          } else {
            this.setState({
              thenYesterdayCompare: 'lower then yesterday'
            })
          }
          console.log(this.state.isDaytime);
          //console.log(this.state.name);
          //console.log(this.state.cityname);

          // this.setState ({
          //   //gradientColors: this.state.name && weatherCases[this.state.name].colors,
          //   weatherImage: this.state.name && weatherCases[this.state.name].iconImg,
          //   weatherImageWidth: this.state.name && weatherCases[this.state.name].width,
          //   weatherImageHeight: this.state.name && weatherCases[this.state.name].height
          // })
          //console.log(this.state.name);
          //console.log(this.state.gradientColors[0]);
          //console.log(this.state.weatherImage);
        })
      })
  };
  
  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });


  render () {

    const { isLoaded, error,isDaytime, temperature, realFeel, name, countrytext, locationtext, thenyesterday, humidity, cityname, currentPositionPM10, currentPositionPM25} = this.state;
    
    

    return (
      
      <View style={{flex: 1}}>


        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />

        {isLoaded ? ( 
          <LinearGradient
          //colors={weatherCases[this.state.name].colors}
          colors={this.state.name ? weatherCases[this.state.name].colors: ["#000000", "#111111"]}
          //colors={'["' + this.state.gradientColors[0] + '","' + this.state.gradientColors[1] + '","' + this.state.gradientColors[2] + '"]'}
          //colors={["#000000", "#111111"]}
          style={{flex: 1}}
          start={[0.6, 0]}
          end={[0.3, 0.9]}
          //locations={[0.0, 0.6 ,1.0]}
        >
            <WeatherContext.Provider value={this.state}>
              <Router style={styles.routerContainer} />
            </WeatherContext.Provider>
          </LinearGradient>
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the fucking weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
       </View> 
      //{weatherCases[name].colors}
    );
  }
}

AppRegistry.registerComponent('WhatTheWeather', () => WhatTheWeather);

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  containerRouter: {
    flex: 1,
  },

  linear: {
    flex: 1,   
  },
  loading: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 1000
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 150,
    color: '#fff'
  },
  
})
