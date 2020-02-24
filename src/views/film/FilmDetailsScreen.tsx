import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Film} from '../../models/Film';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {FilmDao} from '../../services/filmDao';
import {MustSeeFilmsState} from '../../store/film/types';
import {connect, ConnectedProps} from 'react-redux';
import {addFilm, deleteFilm} from '../../store/film/actions';
import {Button, Card, DataTable, Paragraph} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

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
      return <MyActivityIndicator />;
    }

    if (this.state.film) {
      const film: Film = this.state.film;
      return (
        <ScrollView>
          <Card style={{marginBottom: 10}}>
            <Card.Title title={film.title} />
            <Card.Content>
              <Paragraph>{film.description}</Paragraph>
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>Director</DataTable.Cell>
                  <DataTable.Cell numeric>{film.director}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Producer</DataTable.Cell>
                  <DataTable.Cell numeric>{film.producer}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Release date</DataTable.Cell>
                  <DataTable.Cell numeric>{film.release_date}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Score</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {film.rt_score + ' / 100'}
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              {this.props.mustSeeFilms.find(f => f.id === film.id) ? (
                <Button onPress={() => this.props.deleteFilm(film.id)}>
                  Watched
                </Button>
              ) : (
                <Button onPress={() => this.props.addFilm(film)}>
                  Watch later
                </Button>
              )}
            </Card.Actions>
          </Card>

          <Card>
            <Card.Title title={'Note'} />
            <Card.Content>
              <Paragraph>Ma note</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Ajouter une note</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export default connector(FilmDetailsScreen);
