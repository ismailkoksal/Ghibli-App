import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {People} from '../../models/People';
import {PeopleDao} from '../../services/peopleDao';
import {Button} from '../../components/Button';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  people: People[];
}

export default class PeopleScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'People',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      people: [],
    };
  }

  componentDidMount(): void {
    PeopleDao.getAllPeople()
      .then(people => {
        this.setState({
          isLoading: false,
          people,
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
          data={this.state.people}
          renderItem={({item}) => (
            <Button
              title={item.name}
              onPress={() => navigate('PeopleDetails', {peopleId: item.id})}
            />
          )}
        />
      </View>
    );
  }
}
