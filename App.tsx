import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import HomeScreen from './src/views/HomeScreen';
import FilmsScreen from './src/views/FilmsScreen';
import FilmDetailsScreen from './src/views/FilmDetailsScreen';
import PeopleScreen from './src/views/PeopleScreen';
import LocationsScreen from './src/views/LocationsScreen';
import LocationDetailsScreen from './src/views/LocationDetailsScreen';
import SpeciesScreen from './src/views/SpeciesScreen';
import VehiclesScreen from './src/views/VehiclesScreen';
import PeopleDetails from './src/views/PeopleDetailsScreen';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Films: {screen: FilmsScreen},
    FilmDetails: {screen: FilmDetailsScreen},
    People: {screen: PeopleScreen},
    PeopleDetails: {screen: PeopleDetails},
    Locations: {screen: LocationsScreen},
    LocationDetails: {screen: LocationDetailsScreen},
    Species: {screen: SpeciesScreen},
    Vehicles: {screen: VehiclesScreen},
  },
  {initialRouteName: 'Home'},
);

const App = createAppContainer(MainNavigator);

export default App;
