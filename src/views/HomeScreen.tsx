import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {Button, View} from 'react-native';

export interface Props {
  navigation: NavigationStackProp;
}

export default class HomeScreen extends React.Component<Props, any> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Home',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button title="Films" onPress={() => navigate('Films')} />
        <Button title="Films à voir" onPress={() => navigate('MustSeeFilms')} />
        <Button title="People" onPress={() => navigate('People')} />
        <Button title="Locations" onPress={() => navigate('Locations')} />
        <Button title="Species" onPress={() => navigate('Species')} />
        <Button title="Vehicles" onPress={() => navigate('Vehicles')} />
      </View>
    );
  }
}
