import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Film} from '../models/Film';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {FilmDao} from '../services/filmDao';

export interface Props {
  navigation: NavigationStackProp<{filmId: string}>;
}

interface State {
  isLoading: boolean;
  film?: Film;
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
    FilmDao.getFilmById(this.props.navigation.getParam('filmId'))
      .then((film: Film) => {
        this.setState({
          isLoading: false,
          film: film,
        });
      })
      .catch((error: Error) => console.error(error));
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
