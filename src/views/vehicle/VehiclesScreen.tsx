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
import {Vehicle} from '../../models/Vehicle';
import {VehicleDao} from '../../services/vehicleDao';

export interface Props {
  navigation: NavigationStackProp;
}

interface State {
  isLoading: boolean;
  vehicles: Vehicle[];
}

function RenderButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
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
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.vehicles}
          renderItem={({item}) => (
            <RenderButton
              title={item.name}
              onPress={() => navigate('VehicleDetails', {vehicleId: item.id})}
            />
          )}
          keyExtractor={item => item.id}
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
