import React from 'react';
import {ScrollView} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {People} from '../../models/People';
import {PeopleDao} from '../../services/peopleDao';
import {List} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

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
      return <MyActivityIndicator />;
    }

    return (
      <ScrollView>
        {this.state.people.map(people => (
          <List.Item
            title={people.name}
            key={people.id}
            onPress={() => {
              navigate('PeopleDetails', {peopleId: people.id});
            }}
          />
        ))}
      </ScrollView>
    );
  }
}
