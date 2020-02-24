import React from 'react';
import {ScrollView} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import {Species} from '../../models/Species';
import {SpeciesDao} from '../../services/speciesDao';
import {Card, DataTable} from 'react-native-paper';
import MyActivityIndicator from '../../components/MyActivityIndicator';

export interface Props {
  navigation: NavigationStackProp<{speciesId: string}>;
}

interface State {
  isLoading: boolean;
  species?: Species;
}

export default class SpeciesDetailsScreen extends React.Component<
  Props,
  State
> {
  static navigationOptions: NavigationStackOptions = {
    title: 'Species details',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(): void {
    SpeciesDao.getSpeciesById(this.props.navigation.getParam('speciesId'))
      .then(species => {
        this.setState({
          isLoading: false,
          species,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return <MyActivityIndicator />;
    }

    if (this.state.species) {
      const species: Species = this.state.species;
      return (
        <ScrollView>
          <Card>
            <Card.Title title={species.name} />
            <Card.Content>
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>Classification</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {species.classification}
                  </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Eye color</DataTable.Cell>
                  <DataTable.Cell numeric>{species.eye_colors}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Hair color</DataTable.Cell>
                  <DataTable.Cell numeric>{species.hair_colors}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
          </Card>
        </ScrollView>
      );
    }
  }
}
