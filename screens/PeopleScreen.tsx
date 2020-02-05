import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {People} from '../models/People';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  dataSource: People[];
}

function getPeopleFromApiAsync() {
  return fetch('https://ghibliapi.herokuapp.com/people');
}

function RenderButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default class PeopleScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'People',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount(): void {
    getPeopleFromApiAsync()
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <RenderButton
              title={item.name}
              onPress={() => navigate('PeopleDetails', {peopleId: item.id})}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    maxHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: '#000000de',
  },
});
