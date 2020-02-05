import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {Text, TouchableOpacity, View} from 'react-native';

export interface Props {
  navigation: NavigationStackProp;
}

export default class HomeScreen extends React.Component<Props, any> {
  static navigationOptions: NavigationStackOptions = {
    title: 'HomeScreen',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <TouchableOpacity onPress={() => navigate('Films')}>
          <Text>Films</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('People')}>
          <Text>People</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Locations')}>
          <Text>Locations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Species')}>
          <Text>Species</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Vehicles')}>
          <Text>Vehicles</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
