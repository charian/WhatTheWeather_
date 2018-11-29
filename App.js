
import React, {Component} from 'react';
import Router from './routes';
import { View, Text, TouchableOpacity, Image, StyleSheet, AppRegistry, StatusBar } from 'react-native';
import { LinearGradient } from "expo";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { WeatherContext } from "./Context";

import {API_KEY} from "./Keys"
import {datagokr_KEY} from "./Keys"
import {kakao_KEY} from "./Keys"
import {token} from "./Keys"

// export const dataGlobal = {
//   globalName : name
  
// }

export default class CustomDrawer extends Component {

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

        })


      })
      
  };


  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
  

  render () {

    const { isLoaded, error,isDaytime, temperature, realFeel, name, countrytext, locationtext, thenyesterday, humidity, cityname, currentPositionPM10, currentPositionPM25} = this.state;
    
    return (
      <View style={styles.container}>

        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />

        {isLoaded ? ( 
          <View style={styles.container}>

            <WeatherContext.Provider value={this.state} >
              <Router style={styles.routerContainer} />
              <View style={styles.locationContainer}>
                <TouchableOpacity onPress={this._toggleModal} style={styles.locationTitle}>
                  <Text style={styles.indexLocationText}>
                    {this.state.cityname}
                  </Text>
                  <MaterialCommunityIcons name="menu-down" size={32} color="white" style={styles.locationCallIcon} />
                </TouchableOpacity>
              </View>
            </WeatherContext.Provider>

            <Modal 
            isVisible={this.state.isModalVisible} 
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
                <TouchableOpacity onPressOut={this._toggleModal2} style={styles.locationTitle}>
                  <View>
                    <Text>ADD New Location{"\n"}by Keyword</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._toggleModal}>
                  <Text>Hide me!</Text>
                </TouchableOpacity>
              </View>
            </Modal>

          </View>
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
  locationContainer: {
    position: 'absolute',
    top: 60,
    left: 33,
    flex: 1,
    zIndex: 1,
    marginLeft: 15,
  },
  locationTitle: {
    alignItems: 'stretch',
    marginLeft: 15,
    flexDirection: 'row',
  },
  indexLocationText: {
    fontSize: 27,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
  },
  routerContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  linear: {
    flex: 1,   
  },
  loading: {
    flex: 1,
    backgroundColor: '#181740',
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
  modalContainer: {
    backgroundColor: '#fff',
    elevation:4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 99
  },
})
