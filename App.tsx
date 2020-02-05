import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import HomeScreen from './Scenes/HomeScreen';
import FilmsScreen from './Scenes/FilmsScreen';
import FilmDetailsScreen from './Scenes/FilmDetailsScreen';
import PeopleScreen from './Scenes/PeopleScreen';
import LocationsScreen from './Scenes/LocationsScreen';
import SpeciesScreen from './Scenes/SpeciesScreen';
import VehiclesScreen from './Scenes/VehiclesScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Films: {screen: FilmsScreen},
  FilmDetails: {screen: FilmDetailsScreen},
  People: {screen: PeopleScreen},
  Locations: {screen: LocationsScreen},
  Species: {screen: SpeciesScreen},
  Vehicles: {screen: VehiclesScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
