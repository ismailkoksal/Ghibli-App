import React from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {Film} from '../../models/Film';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {FilmDao} from '../../services/filmDao';
import {MustSeeFilmsState} from '../../store/film/types';
import {connect, ConnectedProps} from 'react-redux';
import {addFilm, deleteFilm} from '../../store/film/actions';

const mapState = (state: MustSeeFilmsState) => ({
  mustSeeFilms: state.mustSeeFilms,
});

const mapDispatch = {
  addFilm: (newFilm: Film) => addFilm(newFilm),
  deleteFilm: (idFilm: string) => deleteFilm(idFilm),
};

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: NavigationStackProp<{filmId: string}>;
};

interface State {
  isLoading: boolean;
  film?: Film;
}

class FilmDetailsScreen extends React.Component<Props, State> {
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
    console.log(this.props);
    FilmDao.getFilmById(this.props.navigation.getParam('filmId'))
      .then(film => {
        this.setState({
          isLoading: false,
          film,
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
          <Button
            title={'Watch later'}
            onPress={() => this.props.addFilm(film)}
          />
          <Button
            title={'Watched'}
            onPress={() => this.props.deleteFilm(film.id)}
          />
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

export default connector(FilmDetailsScreen);
