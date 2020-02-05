import React from 'react';
import {Text} from 'react-native';

export default class VehiclesScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Vehicles',
  };

  render() {
    // const {navigate} = this.props.navigation;
    return <Text>Vehicles screen works !</Text>;
  }
}
