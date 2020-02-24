import React from 'react';
import {ScrollView} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {VehicleDao} from '../../services/vehicleDao';
import {Vehicle} from '../../models/Vehicle';
import {Card, DataTable, Paragraph} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

export interface Props {
  navigation: NavigationStackProp<{vehicleId: string}>;
}

interface State {
  isLoading: boolean;
  vehicle?: Vehicle;
}

export default class VehicleDetailsScreen extends React.Component<
  Props,
  State
> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Vehicle details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    VehicleDao.getVehicleById(this.props.navigation.getParam('vehicleId'))
      .then(vehicle => {
        this.setState({
          isLoading: false,
          vehicle,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return <MyActivityIndicator />;
    }

    if (this.state.vehicle) {
      const vehicle: Vehicle = this.state.vehicle;
      return (
        <ScrollView>
          <Card>
            <Card.Title title={vehicle.name} />
            <Card.Content>
              <Paragraph>{vehicle.description}</Paragraph>
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>Class</DataTable.Cell>
                  <DataTable.Cell>{vehicle.vehicle_class}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Length</DataTable.Cell>
                  <DataTable.Cell>{vehicle.length}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
          </Card>
        </ScrollView>
      );
    }
  }
}
