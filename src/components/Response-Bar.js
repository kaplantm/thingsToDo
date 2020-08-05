import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/colors';
import { setIdeaSentiment } from '../redux/slices/ideas';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { findIndexOfObjWithId } from '../lib/utils';
import {
  getIsDisliked,
  getIsLiked,
  DISLIKE_SENTIMENT,
  LIKE_SENTIMENT,
  NEUTRAL_SENTIMENT,
} from '../constants/likes';

function ResponseBar({
  idea,
  sentiment,
  doSetIdeaSentiment,
  incrementIndex,
  onSentimentChange,
}) {
  const disliked = getIsDisliked(sentiment);
  const liked = getIsLiked(sentiment);

  function toggleDislike() {
    const newSentiment = disliked ? NEUTRAL_SENTIMENT : DISLIKE_SENTIMENT;
    doSetIdeaSentiment({
      idea,
      sentiment: newSentiment,
    });
    onSentimentChange(newSentiment, idea.id);
  }

  function toggleLike() {
    const newSentiment = liked ? NEUTRAL_SENTIMENT : LIKE_SENTIMENT;
    doSetIdeaSentiment({
      idea,
      sentiment: newSentiment,
    });
    onSentimentChange(newSentiment, idea.id);
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
  ({ ideas }, { idea }) => {
    const id = idea?.id;
    return {
      sentiment:
        idea?.id !== undefined
          ? ideas.sentimentalIdeas[id]?.sentiment
          : NEUTRAL_SENTIMENT,
    };
  },
  {
    doSetIdeaSentiment: setIdeaSentiment,
  },
)(ResponseBar);
