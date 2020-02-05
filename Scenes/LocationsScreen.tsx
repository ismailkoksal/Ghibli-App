import React from 'react';
import {Text} from 'react-native';

export default class FilmsScreen extends React.Component<any, any> {
  static navigationsOptions = {
    title: 'Locations',
  };

  render() {
    // const {navigate} = this.props.navigation;
    return <Text>Locations screen works !</Text>;
  }
}
