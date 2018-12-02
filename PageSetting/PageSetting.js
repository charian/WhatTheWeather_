import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { WeatherContext } from "../Context";
import SelectLocation from "../location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Autocomplete from 'react-native-autocomplete-input';

import Modal from "react-native-modal";

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];


class PageSetting extends Component {
  static renderFilm(film) {
    const { title, director, opening_crawl, episode_id } = film;
    const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;

    return (
      <View>
        <Text style={styles.titleText}>{roman}. {title}</Text>
        <Text style={styles.directorText}>({director})</Text>
        <Text style={styles.openingText}>{opening_crawl}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: ''
    };
  }

  componentDidMount() {
    fetch(`${API}/films/`).then(res => res.json()).then((json) => {
      const { results: films } = json;
      this.setState({ films });
    });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0].title) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter City Keywords"
          renderItem={({ title, release_date }) => (
            <TouchableOpacity onPress={() => this.setState({ query: title })}>
              <Text style={styles.itemText}>
                {title} ({release_date.split('-')[0]})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            PageSetting.renderFilm(films[0])
          ) : (
            <Text style={styles.infoText}>
              Enter Title of a Star Wars movie
            </Text>
          )}
        </View>
      </View>
    );
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
