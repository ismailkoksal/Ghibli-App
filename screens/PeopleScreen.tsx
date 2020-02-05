import React from 'react';
import {Text} from 'react-native';

export default class PeopleScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'People',
  };

  render() {
    // const {navigate} = this.props.navigation;
    return <Text>People screen works !</Text>;
  }
}
