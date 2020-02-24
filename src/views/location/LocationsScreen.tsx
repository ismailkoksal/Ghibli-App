import React from 'react';
import {Picker, ScrollView, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Location} from '../../models/Location';
import {LocationDao} from '../../services/locationDao';
import {List} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

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
      return <MyActivityIndicator />;
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
        <ScrollView>
          {this.getAllLocations().map(location => (
            <List.Item
              title={location.name}
              key={location.id}
              onPress={() => {
                navigate('LocationDetails', {locationId: location.id});
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
