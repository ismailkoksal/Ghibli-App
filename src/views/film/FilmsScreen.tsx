import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Film} from '../../models/Film';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {FilmDao} from '../../services/filmDao';
import {Button} from '../../components/Button';

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
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.films}
          renderItem={({item}) => (
            <Button
              title={item.title}
              onPress={() => navigate('FilmDetails', {filmId: item.id})}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
