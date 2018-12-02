import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "./Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export class SelectLocation extends Component {

  state = { 
    isModalVisible: false,
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={this._toggleModal} style={styles.locationTitle}>
            <Text style={styles.indexLocationText}>
              {this.props.value.cityname}
            </Text>
            <MaterialCommunityIcons name="menu-down" size={32} color="white" style={styles.locationCallIcon} />
          </TouchableOpacity>

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
        

    );
  }
}

export default () => (
  <WeatherContext.Consumer>
    {value => <SelectLocation value={value} />}
  </WeatherContext.Consumer>
);

const styles = StyleSheet.create({
   locationContainer: {
    position: 'absolute',
    top: 37,
    left: 60,
    flex: 1,
    zIndex: 100,
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