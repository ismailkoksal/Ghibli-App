import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {MustSeeFilmsState} from '../../store/film/types';
import {connect, ConnectedProps} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {deleteFilm} from '../../store/film/actions';
import {Appbar, IconButton, List} from 'react-native-paper';

const mapState = (state: MustSeeFilmsState) => ({
  mustSeeFilms: state.mustSeeFilms,
});

const mapDispatch = {
  deleteFilm: (idFilm: string) => deleteFilm(idFilm),
};

const connector = connect(
  mapState,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: NavigationStackProp<{filmId: string}>;
};

class MustSeeFilmsScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </Appbar.Header>
        <ScrollView>
          {this.props.mustSeeFilms.map(film => (
            <List.Item
              title={film.title}
              key={film.id}
              right={() => (
                <IconButton
                  icon="delete"
                  color="red"
                  onPress={() => {
                    this.props.deleteFilm(film.id);
                  }}
                />
              )}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connector(MustSeeFilmsScreen);
