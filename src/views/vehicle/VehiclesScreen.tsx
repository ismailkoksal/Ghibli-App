import React from 'react';
import {ScrollView} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Vehicle} from '../../models/Vehicle';
import {VehicleDao} from '../../services/vehicleDao';
import {List} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  vehicles: Vehicle[];
}

export default class VehiclesScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Vehicles',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      vehicles: [],
    };
  }

  componentDidMount(): void {
    VehicleDao.getAllVehicles()
      .then(vehicles => {
        this.setState({
          isLoading: false,
          vehicles,
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
        {this.state.vehicles.map(vehicle => (
          <List.Item
            title={vehicle.name}
            key={vehicle.id}
            onPress={() => {
              navigate('VehicleDetails', {vehicleId: vehicle.id});
            }}
          />
        ))}
      </ScrollView>
    );
  }
}
