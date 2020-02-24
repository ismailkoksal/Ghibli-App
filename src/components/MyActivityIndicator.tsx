import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default class MyActivityIndicator extends React.Component {
  render() {
    return (
      <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
