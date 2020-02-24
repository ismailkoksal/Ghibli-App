import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

export interface Props {
  navigation: NavigationStackProp;
}

export default class HomeScreen extends React.Component<Props> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Home',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
        <Button onPress={() => navigate('Films')}>Films</Button>
        <Button onPress={() => navigate('People')}>People</Button>
        <Button onPress={() => navigate('Locations')}>Locations</Button>
        <Button onPress={() => navigate('Species')}>Species</Button>
        <Button onPress={() => navigate('Vehicles')}>Vehicles</Button>
      </View>
    );
  }
}
