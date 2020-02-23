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
import {Provider} from 'react-redux';
import Store from './src/store/initStore';
import MustSeeFilmsScreen from './src/views/film/MustSeeFilmsScreen';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Films: {screen: FilmsScreen},
    FilmDetails: {screen: FilmDetailsScreen},
    MustSeeFilms: {screen: MustSeeFilmsScreen},
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

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}
