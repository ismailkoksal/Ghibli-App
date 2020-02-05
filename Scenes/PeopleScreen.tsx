import React from 'react';
import {Text} from 'react-native';

export default class FilmsScreen extends React.Component<any, any> {
  static navigationsOptions = {
    title: 'People',
  };

  render() {
    // const {navigate} = this.props.navigation;
    return <Text>People screen works !</Text>;
  }
}
