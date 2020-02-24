import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {Location} from '../../models/Location';
import {ScrollView} from 'react-native';
import {LocationDao} from '../../services/locationDao';
import {Card, DataTable} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

export interface Props {
  navigation: NavigationStackProp<{locationId: string}>;
}

interface State {
  isLoading: boolean;
  location?: Location;
}

export default class LocationDetailsScreen extends React.Component<
  Props,
  State
> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Location details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    LocationDao.getLocationById(this.props.navigation.getParam('locationId'))
      .then(location => {
        this.setState({
          isLoading: false,
          location,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return <MyActivityIndicator />;
    }

    if (this.state.location) {
      const location: Location = this.state.location;
      return (
        <ScrollView>
          <Card>
            <Card.Title title={location.name} />
            <Card.Content>
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>Climate</DataTable.Cell>
                  <DataTable.Cell numeric>{location.climate}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Terrain</DataTable.Cell>
                  <DataTable.Cell numeric>{location.terrain}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Water surface</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {location.surface_water}
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
          </Card>
        </ScrollView>
      );
    }
  }
}
