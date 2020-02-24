import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/views/HomeScreen';
import FilmsScreen from './src/views/film/FilmsScreen';
import FilmDetailsScreen from './src/views/film/FilmDetailsScreen';
import PeopleScreen from './src/views/people/PeopleScreen';
import LocationsScreen from './src/views/location/LocationsScreen';
import LocationDetailsScreen from './src/views/location/LocationDetailsScreen';
import SpeciesScreen from './src/views/species/SpeciesScreen';
import VehiclesScreen from './src/views/vehicle/VehiclesScreen';
import PeopleDetails from './src/views/people/PeopleDetailsScreen';
import VehicleDetailsScreen from './src/views/vehicle/VehicleDetailsScreen';
import SpeciesDetailsScreen from './src/views/species/SpeciesDetailsScreen';
import React from 'react';
import Store from './src/store/initStore';
import MustSeeFilmsScreen from './src/views/film/MustSeeFilmsScreen';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

const MainStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Films: {screen: FilmsScreen},
    FilmDetails: {screen: FilmDetailsScreen},
    People: {screen: PeopleScreen},
    PeopleDetails: {screen: PeopleDetails},
    Locations: {screen: LocationsScreen},
    LocationDetails: {screen: LocationDetailsScreen},
    Species: {screen: SpeciesScreen},
    SpeciesDetails: {screen: SpeciesDetailsScreen},
    Vehicles: {screen: VehiclesScreen},
    VehicleDetails: {screen: VehicleDetailsScreen},
  },
  {initialRouteName: 'Home'},
);

const Tab = createMaterialBottomTabNavigator({
  Home: {screen: MainStack, navigationOptions: {tabBarLabel: 'Home'}},
  MustSeeFilms: {
    screen: MustSeeFilmsScreen,
    navigationOptions: {
      tabBarLabel: 'Must see films',
    },
  },
});

const Navigation = createAppContainer(Tab);

export default class App extends React.Component<any, any> {
  render() {
    return (
      <StoreProvider store={Store}>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
