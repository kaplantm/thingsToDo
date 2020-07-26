import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/colors';
import {toggleLikeIdea, toggleDislikeIdea} from '../redux/slices/ideas';

function ResponseBar({
  id,
  doToggleLikeIdea,
  doToggleDislikeIdea,
  liked,
  disliked,
}) {
  console.log({liked, disliked});
  return (
    <View style={styles.container}>
      <Icon
        onPress={() => {
          console.log('dislike idea', id);
          toggleDislikeIdea({id});
        }}
        style={styles.icon}
        name="thumb-down"
        size={60}
        color={disliked ? Colors.accentPrimary : Colors.defaultPrimary}
      />
      <Icon
        onPress={() => {
          console.log('like idea', id);
          doToggleLikeIdea({id});
        }}
        name="thumb-up"
        style={styles.icon}
        size={60}
        color={liked ? Colors.accentPrimary : Colors.defaultPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 20,
  },
  icon: {
    marginRight: 20,
    marginLeft: 20,
  },
});

export default connect(null, {
  doToggleLikeIdea: toggleLikeIdea,
  doToggleDislikeIdea: toggleDislikeIdea,
})(ResponseBar);
