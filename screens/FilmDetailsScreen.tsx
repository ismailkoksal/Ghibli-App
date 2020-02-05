import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Film} from '../models/Film';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

export interface Props {
  navigation: NavigationStackProp<{filmId: string}>;
}

interface State {
  isLoading: boolean;
  film?: Film;
}

function getFilmDetailFromApiAsync(filmId: string) {
  return fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`);
}

export default class FilmDetailsScreen extends React.Component<Props, State> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Film details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    getFilmDetailFromApiAsync(this.props.navigation.getParam('filmId'))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          film: responseJson,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.film) {
      const film: Film = this.state.film;
      return (
        <View>
          <Text style={styles.title}>{film.title}</Text>
          <Text>{film.description}</Text>
          <Text>{film.release_date}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 32,
  },
});
