import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {People} from '../../models/People';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {PeopleDao} from '../../services/peopleDao';

export interface Props {
  navigation: NavigationStackProp<{peopleId: string}>;
}

interface State {
  isLoading: boolean;
  people?: People;
}

export default class PeopleDetails extends React.Component<Props, State> {
  static navigationOptions: NavigationStackOptions = {
    title: 'People details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    PeopleDao.getPeopleById(this.props.navigation.getParam('peopleId'))
      .then(people => {
        this.setState({
          isLoading: false,
          people,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.people) {
      const people: People = this.state.people;
      return (
        <View>
          <Text style={styles.title}>{people.name}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 32,
  },
});
