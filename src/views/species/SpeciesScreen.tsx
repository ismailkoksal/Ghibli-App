import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Species} from '../../models/Species';
import {SpeciesDao} from '../../services/speciesDao';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  species: Species[];
}

function RenderButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
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
            <RenderButton
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

const styles = StyleSheet.create({
  button: {
    maxHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: '#000000de',
  },
});
