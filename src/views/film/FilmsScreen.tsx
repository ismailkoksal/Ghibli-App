import React from 'react';
import {ScrollView} from 'react-native';
import {Film} from '../../models/Film';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {FilmDao} from '../../services/filmDao';
import {List} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  films: Film[];
}

export default class FilmsScreen extends React.Component<Props, State> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Films',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      films: [],
    };
  }

  componentDidMount(): void {
    FilmDao.getAllFilms()
      .then(films => {
        this.setState({
          isLoading: false,
          films,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return <MyActivityIndicator />;
    }

    return (
      <ScrollView>
        {this.state.films.map(film => (
          <List.Item
            title={film.title}
            key={film.id}
            onPress={() => {
              navigate('FilmDetails', {filmId: film.id});
            }}
          />
        ))}
      </ScrollView>
    );
  }
}
