import React from 'react';
import {ActivityIndicator, FlatList, Picker, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Location} from '../../models/Location';
import {LocationDao} from '../../services/locationDao';
import {Button} from '../../components/Button';

export interface Props {
  navigation: NavigationStackProp;
}

export interface State {
  isLoading: boolean;
  locations: Location[];
  selectedTerrain: string;
}

export default class LocationsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Locations',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      locations: [],
      selectedTerrain: 'None',
    };
  }

  componentDidMount(): void {
    LocationDao.getAllLocations().then(locations => {
      this.setState({
        isLoading: false,
        locations,
      });
    });
  }

  getAllLocations(): Location[] {
    if (this.state.selectedTerrain !== 'None') {
      return this.state.locations.filter(
        location => location.terrain === this.state.selectedTerrain,
      );
    }
    return this.state.locations;
  }

  getAllTerrains(): string[] {
    return [...new Set(this.state.locations.map(location => location.terrain))];
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
        <Picker
          selectedValue={this.state.selectedTerrain}
          onValueChange={itemValue =>
            this.setState({selectedTerrain: itemValue})
          }>
          <Picker.Item key="None" label="None" value="None" />
          {this.getAllTerrains().map(terrain => (
            <Picker.Item key={terrain} label={terrain} value={terrain} />
          ))}
        </Picker>
        <FlatList
          data={this.getAllLocations()}
          renderItem={({item}) => (
            <Button
              title={item.name}
              onPress={() => navigate('LocationDetails', {locationId: item.id})}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
