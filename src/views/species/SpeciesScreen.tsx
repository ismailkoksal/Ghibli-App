import React from 'react';
import {ScrollView} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Species} from '../../models/Species';
import {SpeciesDao} from '../../services/speciesDao';
import {List} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

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
      return <MyActivityIndicator />;
    }

    return (
      <ScrollView>
        {this.state.species.map(species => (
          <List.Item
            title={species.name}
            key={species.id}
            onPress={() => {
              navigate('SpeciesDetails', {speciesId: species.id});
            }}
          />
        ))}
      </ScrollView>
    );
  }
}
