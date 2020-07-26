import React, { useEffect } from 'react';
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
  conditionalAddToLimbo,
  fullListIdeaIndex,
}) {
  useEffect(() => {
    conditionalAddToLimbo(fullListIdeaIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked, disliked, fullListIdeaIndex]);

  function toggleDislike() {
    doToggleDislikeIdea({ id });
  }
  function toggleLike() {
    doToggleLikeIdea({ id });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDislike}
        style={[
          styles.iconCircle,
          {
            backgroundColor: disliked
              ? Colors.accentPrimary
              : Colors.lightPrimary,
          },
        ]}>
        <Icon
          style={styles.icon}
          name="thumb-down"
          size={60}
          color={disliked ? Colors.lightPrimary : Colors.defaultPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={incrementIndex} style={styles.next}>
        <Icon
          style={styles.icon}
          name="arrow-forward"
          size={70}
          color={Colors.lightPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleLike}
        style={[
          styles.iconCircle,
          { backgroundColor: liked ? Colors.blue : Colors.lightPrimary },
        ]}>
        <Icon
          name="thumb-up"
          style={styles.icon}
          size={60}
          color={liked ? Colors.lightPrimary : Colors.defaultPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 20,
  },
  iconCircle: {
    borderRadius: 100,
    backgroundColor: Colors.lightPrimary,
    paddingTop: 18,
    paddingBottom: 18,
  },
  next: {
    paddingTop: 13,
    paddingBottom: 13,
    opacity: 0.75,
  },
  icon: {
    marginRight: 20,
    marginLeft: 20,
  },
});

export default connect(
  ({ ideas }, { id }) => {
    const ideaIndex = findIndexOfObjWithId(ideas, id);
    let idea = {};
    if (ideaIndex !== -1) {
      idea = ideas[ideaIndex];
    }
    return {
      fullListIdeaIndex: ideaIndex,
      liked: idea.liked,
      disliked: idea.disliked,
    };
  },
  {
    doToggleLikeIdea: toggleLikeIdea,
    doToggleDislikeIdea: toggleDislikeIdea,
  },
)(ResponseBar);
