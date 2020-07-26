import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/colors';
import { toggleLikeIdea, toggleDislikeIdea } from '../redux/slices/ideas';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { findIndexOfObjWithId } from '../utils';

function ResponseBar({
  id,
  doToggleLikeIdea,
  doToggleDislikeIdea,
  liked,
  disliked,
  incrementIndex,
}) {
  function toggleDislike() {
    doToggleDislikeIdea({ id });
  }
  function toggleLike() {
    doToggleLikeIdea({ id });
  }
  return (
    <View style={styles.container}>
      <Icon
        onPress={toggleDislike}
        style={styles.icon}
        name="thumb-down"
        size={60}
        color={disliked ? Colors.accentPrimary : Colors.defaultPrimary}
      />
      <TouchableOpacity
        onPress={() => {
          console.log('onpress next', id);
          incrementIndex();
        }}>
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
      <Icon
        onPress={toggleLike}
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
  next: {
    fontSize: 60,
    color: 'white',
  },
});

export default connect(
  ({ ideas }, { id }) => {
    const ideaIndex = findIndexOfObjWithId(ideas, id);
    let idea = {};
    if (ideaIndex !== -1) {
      idea = ideas[ideaIndex];
    }
    console.log('connect', { idea, id });
    return {
      liked: idea.liked,
      disliked: idea.disliked,
    };
  },
  {
    doToggleLikeIdea: toggleLikeIdea,
    doToggleDislikeIdea: toggleDislikeIdea,
  },
)(ResponseBar);
