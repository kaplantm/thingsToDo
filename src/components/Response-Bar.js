import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/colors';
import {
  setIdeaSentiment,
  deleteIdea,
  upsertIdea,
} from '../redux/slices/ideas';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  getIsDisliked,
  getIsLiked,
  DISLIKE_SENTIMENT,
  LIKE_SENTIMENT,
  NEUTRAL_SENTIMENT,
} from '../constants/likes';

function ResponseBar({
  idea,
  index,
  sentiment,
  doSetIdeaSentiment,
  incrementIndex,
  onSentimentChange,
  onDeleteIdea,
  onRestoreIdea,
  isInLimbo,
  atEndOfIdeas,
  doDeleteIdea,
  doUpsertIdea,
  navigation,
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

  function handleDeleteIdea() {
    console.log('deletIdea');
    doDeleteIdea({ id: idea.id });
    onDeleteIdea(idea.id);
  }

  function handleRestoreIdea() {
    doUpsertIdea({ id: idea.id, text: idea.text });
    onRestoreIdea(idea.id);
  }

  function goToEditIdea() {
    navigation.push('New Idea', {
      idea,
      title: 'Edit Idea',
      ideaIndex: index,
    });
  }

  return (
    <View style={styles.container}>
      {idea.isCustom ? (
        <TouchableOpacity
          onPress={isInLimbo ? handleRestoreIdea : handleDeleteIdea}
          style={[
            styles.iconCircle,
            {
              backgroundColor: Colors.lightPrimary,
            },
          ]}>
          <Icon
            style={styles.icon}
            name={isInLimbo ? 'undo' : 'delete'}
            size={60}
            color={Colors.defaultPrimary}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={toggleDislike}
          style={[
            styles.iconCircle,
            {
              backgroundColor: Colors.lightPrimary,
            },
          ]}>
          <Icon
            style={styles.icon}
            name="thumb-down"
            size={60}
            color={disliked ? Colors.lightPrimary : Colors.defaultPrimary}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        disabled={atEndOfIdeas}
        onPress={incrementIndex}
        style={styles.next}>
        <Icon
          style={[styles.icon, atEndOfIdeas && styles.iconDisabled]}
          name="arrow-forward"
          size={70}
          color={Colors.lightPrimary}
        />
      </TouchableOpacity>

      {idea.isCustom ? (
        <TouchableOpacity
          onPress={goToEditIdea}
          disabled={isInLimbo}
          style={[
            styles.iconCircle,
            {
              backgroundColor: isInLimbo
                ? Colors.darkPrimary
                : Colors.lightPrimary,
            },
          ]}>
          <Icon
            name="edit"
            style={styles.icon}
            size={60}
            color={isInLimbo ? Colors.defaultPrimaryAlt : Colors.defaultPrimary}
          />
        </TouchableOpacity>
      ) : (
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
      )}
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
  },
  icon: {
    marginRight: 20,
    marginLeft: 20,
  },
  iconDisabled: {
    opacity: 0.3,
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
    doDeleteIdea: deleteIdea,
    doUpsertIdea: upsertIdea,
  },
)(ResponseBar);
