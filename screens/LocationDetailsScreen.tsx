import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {Location} from '../models/Location';
import {ActivityIndicator, Text, View} from 'react-native';

export interface Props {
  navigation: NavigationStackProp<{locationId: string}>;
}

interface State {
  isLoading: boolean;
  location?: Location;
}

function getLocationDetailFromApiAsync(locationId: string) {
  return fetch(`https://ghibliapi.herokuapp.com/locations/${locationId}`);
}

export default class LocationDetailsScreen extends React.Component<
  Props,
  State
> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Location details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    getLocationDetailFromApiAsync(this.props.navigation.getParam('locationId'))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          location: responseJson,
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

    if (this.state.location) {
      const location: Location = this.state.location;
      return (
        <View>
          <Text>{location.name}</Text>
        </View>
      );
    }
  }
}
