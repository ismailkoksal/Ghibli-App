import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {MustSeeFilmsState} from '../../store/film/types';
import {connect, ConnectedProps} from 'react-redux';
import {FlatList, Text, View} from 'react-native';

const mapState = (state: MustSeeFilmsState) => ({
  mustSeeFilms: state.mustSeeFilms,
});

const connector = connect(mapState);

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
        <FlatList
          data={this.props.mustSeeFilms}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
      </View>
    );
  }
}

export default connector(MustSeeFilmsScreen);
