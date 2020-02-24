import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {People} from '../../models/People';
import {PeopleDao} from '../../services/peopleDao';
import {Card, DataTable, List} from 'react-native-paper';
import {Film} from '../../models/Film';
import {FilmDao} from '../../services/filmDao';
import MyActivityIndicator from '../../components/MyActivityIndicator';
import {ScrollView} from 'react-native';

export interface Props {
  navigation: NavigationStackProp<{peopleId: string}>;
}

interface State {
  isLoading: boolean;
  people?: People;
  films: Film[];
}

export default class PeopleDetails extends React.Component<Props, State> {
  static navigationOptions: NavigationStackOptions = {
    title: 'People details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      films: [],
    };
  }

  componentDidMount(): void {
    PeopleDao.getPeopleById(this.props.navigation.getParam('peopleId'))
      .then(people => {
        this.setState(
          {
            people,
          },
          () => {
            people.films.map(filmUrl => this.getFilm(filmUrl));
          },
        );
      })
      .catch(error => console.error(error));
  }

  getFilm(filmUrl: string): Promise<Film> {
    this.setState({isLoading: true});
    return FilmDao.getFilmByUrl(filmUrl).then(film => {
      this.setState({
        isLoading: false,
        films: [...this.state.films, film],
      });
      return film;
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return <MyActivityIndicator />;
    }

    if (this.state.people) {
      const people: People = this.state.people;
      return (
        <ScrollView>
          <Card>
            <Card.Title title={people.name} />
            <Card.Content>
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>Gender</DataTable.Cell>
                  <DataTable.Cell numeric>{people.gender}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Age</DataTable.Cell>
                  <DataTable.Cell numeric>{people.age}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Eye color</DataTable.Cell>
                  <DataTable.Cell numeric>{people.eye_color}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Hair color</DataTable.Cell>
                  <DataTable.Cell numeric>{people.hair_color}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <List.Section>
                <List.Subheader>APPEAR IN FILMS</List.Subheader>
                {this.state.films.map(film => (
                  <List.Item
                    title={film.title}
                    key={film.id}
                    onPress={() => {
                      navigate('FilmDetails', {filmId: film.id});
                    }}
                    right={() => <List.Icon icon="chevron-right" />}
                  />
                ))}
              </List.Section>
            </Card.Content>
          </Card>
        </ScrollView>
      );
    }
  }
}
