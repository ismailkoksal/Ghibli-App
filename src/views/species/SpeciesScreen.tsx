import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Species} from '../../models/Species';
import {SpeciesDao} from '../../services/speciesDao';
import {Button} from '../../components/Button';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  species: Species[];
}

export default class SpeciesScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Species',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      species: [],
    };
  }

  componentDidMount(): void {
    SpeciesDao.getAllSpecies()
      .then(species => {
        this.setState({
          isLoading: false,
          species,
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
          data={this.state.species}
          renderItem={({item}) => (
            <Button
              title={item.name}
              onPress={() => navigate('SpeciesDetails', {speciesId: item.id})}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
