import React from 'react';
import {Text} from 'react-native';

export default class SpeciesScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Species',
  };

  render() {
    // const {navigate} = this.props.navigation;
    return <Text>Species screen works !</Text>;
  }
}
