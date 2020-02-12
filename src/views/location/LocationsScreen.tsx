import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Location} from '../../models/Location';
import {LocationDao} from '../../services/locationDao';

export interface Props {
  navigation: NavigationStackProp;
}

export interface State {
  isLoading: boolean;
  locations: Location[];
  terrain: string;
}

function RenderButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
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
      terrain: 'None',
    };
  }

  getLocations(): Location[] {
    if (this.state.terrain !== 'None') {
      return this.state.locations.filter(
        location => location.terrain === this.state.terrain,
      );
    }
    return this.state.locations;
  }

  componentDidMount(): void {
    LocationDao.getAllLocations().then(locations => {
      this.setState({
        isLoading: false,
        locations,
      });
    });
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
          selectedValue={this.state.terrain}
          onValueChange={itemValue => this.setState({terrain: itemValue})}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Mountain" value="Mountain" />
          <Picker.Item label="Hill" value="Hill" />
          <Picker.Item label="Plain" value="Plain" />
          <Picker.Item label="Marsh" value="Marsh" />
          <Picker.Item label="TODO" value="TODO" />
          <Picker.Item label="Forest" value="Forest" />
          <Picker.Item label="City" value="City" />
          <Picker.Item label="River" value="River" />
          <Picker.Item label="Ocean" value="Ocean" />
        </Picker>
        <FlatList
          data={this.getLocations()}
          renderItem={({item}) => (
            <RenderButton
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