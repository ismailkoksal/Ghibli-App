import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import FilmsScreen from './screens/FilmsScreen';
import FilmDetailsScreen from './screens/FilmDetailsScreen';
import PeopleScreen from './screens/PeopleScreen';
import LocationsScreen from './screens/LocationsScreen';
import LocationDetailsScreen from './screens/LocationDetailsScreen';
import SpeciesScreen from './screens/SpeciesScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import PeopleDetails from './screens/PeopleDetailsScreen';

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
