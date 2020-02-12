import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {VehicleDao} from '../../services/vehicleDao';
import {Vehicle} from '../../models/Vehicle';

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
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.vehicle) {
      const vehicle: Vehicle = this.state.vehicle;
      return (
        <View>
          <Text style={styles.title}>{vehicle.name}</Text>
          <Text>{vehicle.description}</Text>
          <Text>{vehicle.pilot}</Text>
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
