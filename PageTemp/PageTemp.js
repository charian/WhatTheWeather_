import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "../Context";
import SelectLocation from "../location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Modal from "react-native-modal";

export class PageTemp extends Component {

  state = { 
    isModalVisible1: false,
    timeStyle: null,
  }

  _toggleModal1 = () => this.setState({ isModalVisible1: !this.state.isModalVisible1 });


  render() {
    
    // console.log('day?' + this.props.value.isDaytime);
    // console.log(this.props.value.timeStyle);
    //console.log(this.props.value.name);
    //console.log(this.props.value.isDayTimeGradientsTate);
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
    
    


  //   <LinearGradient
  //   colors={weatherCases[this.props.value.name].colors}
  //   style={styles.linear}
  //   start={[0.6, 0]}
  //   end={[0.3, 0.9]}
  //   locations={[0.0, 0.6 ,1.0]}
  // >

      
//console.log(this.props.value.sunLabel);
//console.log(this.props.value.isDayTimeGradient);
  //console.log('from temp page : ' + this.props.value.weatherImage);

    return (


      <View style={{flex: 1, backgroundColor: 'transparent'}}>

          <SelectLocation />
          <View style={styles.upper}>
          <Image 
              source={this.props.value.weatherImage}
              style={{
                width: this.props.value.weatherImageWidth, 
                height: this.props.value.weatherImageHeight,
                alignSelf: 'center'
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
                  {this.props.value.thenyesterday}º {this.props.value.thenYesterdayCompare}
                </Text>
              </View>
            </View>
            
            <View style={styles.lowerEtc}>
              <View style={styles.lowerEtcWidget } style={{flex: 1} }>
                <Image source={require('./../assets/images/icon-aq-2x.png')} style={{width: 29,height: 27,} } />
                <Text style={styles.lowerEtcTitle}>Air Quility</Text>
                <Text style={styles.lowerEtcValue01} numberOfLines={1} >{this.props.value.AQIResult}</Text>
              </View>
              <View style={styles.lowerEtcWidget} style={{flex: 0.8, marginTop: 2} }>
                <Image source={require('./../assets/images/icon-senset-2x.png')} style={{width: 26,height: 24} } />
                <Text style={styles.lowerEtcTitle}>{this.props.value.sunLabel}</Text>
                <Text style={styles.lowerEtcValue}>{this.props.value.sunLabelTime}</Text>
              </View>
              <View style={styles.lowerEtcWidget} style={{flex: 0.8} }>
                <Image source={require('./../assets/images/icon-hu-2x.png')} style={{width: 21,height: 27} } />
                <Text style={styles.lowerEtcTitle}>Humidity</Text>
                <Text style={styles.lowerEtcValue}>{this.props.value.humidity}%</Text>
              </View>
              <View style={styles.lowerEtcWidget} style={{flex: 1, marginTop: 3} }>
                <Image source={require('./../assets/images/icon-wind-2x.png')} style={{width: 22,height: 23} } />
                <Text style={styles.lowerEtcTitle}>Wind</Text>
                <Text style={styles.lowerEtcValue}>{this.props.value.windSpeed}Km/s</Text>
              </View>
            </View>
          </View>
          <LinearGradient 
            colors={['#FFDC00', 'transparent']}
            start={[1,0]}
            end={[0,0]}
            style={[this.props.value.aqGradient]}
            />
          <LinearGradient 
            colors={['#110035', 'transparent']}
            start={[0,0]}
            end={[0,1]}
            style={[this.props.value.isDayTimeGradientsTate]}
            />
      </View>


    );
  }
}

export default () => (
  <WeatherContext.Consumer>
    {value => <PageTemp value={value} />}
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
  dayGradient: {
    flex: 1, position: 'absolute', left: 0, right: 0, top: 0, zIndex: 0, height: 900, 
  },
  dayTimeGradient: {
    opacity: 0
  },
  nightTimeGradient: {
    opacity: 1
  },
  linear: {
    flex: 1,   
  },
  upper: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: 'center',
    zIndex: 5
  },
  lower: {
    flex: 1,
    paddingLeft: 25,
    zIndex: 5
  },
  lowerDgree: {
    flex: 1,  justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'flex-end'
    //alignSelf: 'flex-start',
    //justifyContent: 'flex-end'
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
    flex: 1, flexDirection: 'row', alignItems: 'center'
    
  },
  lowerEtcWidget: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  lowerEtcTitle: {
    fontSize: 12,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginTop: 10,
  },
  lowerEtcValue: {
    fontSize: 15,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginTop: 4,
  },
  lowerEtcValue01: {
    fontSize: 15,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginTop: 4,
    paddingRight: 14
  },
  currentTemp: {
    fontSize: 80,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold"
  },
  currentReal: {
    fontSize: 45,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    // marginLeft: 8,
    marginBottom: 8,
  },
  currentTempDeg: {
    fontSize: 50,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginBottom: 40,
    marginLeft: -5
    
  },
  currentRealDeg: {
    fontSize: 30,
    color: '#fff',
    fontFamily: "Arial Rounded MT Bold",
    marginBottom: 26,
  },
  realFeelBadge: {
    width: 61,
    height: 19,
    marginBottom: 16,
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