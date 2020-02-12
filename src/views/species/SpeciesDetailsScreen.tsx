import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {Species} from '../../models/Species';
import {SpeciesDao} from '../../services/speciesDao';

export interface Props {
  navigation: NavigationStackProp<{speciesId: string}>;
}

interface State {
  isLoading: boolean;
  species?: Species;
}

export default class SpeciesDetailsScreen extends React.Component<
  Props,
  State
> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Species details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    SpeciesDao.getSpeciesById(this.props.navigation.getParam('speciesId'))
      .then(species => {
        this.setState({
          isLoading: false,
          species,
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

    if (this.state.species) {
      const species: Species = this.state.species;
      return (
        <View>
          <Text style={styles.title}>{species.name}</Text>
          <Text>{species.classification}</Text>
          <Text>{species.hairColors}</Text>
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
