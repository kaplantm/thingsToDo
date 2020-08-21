import React, { useState, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import IdeaCarousel from '../components/IdeaCarousel';
import Colors from '../../theme/colors';
import getLocalIdeas from '../lib/getIdeasLocal';
import graphQLClient from '../api/graphql/client';
import {
  getQueryTodosInCategory,
  getQueryTodosAll,
} from '../api/graphql/queries';
import { shuffleArray, findIndexOfObjWithId } from '../lib/utils';
import { NEUTRAL_SENTIMENT } from '../constants/likes';
import { LOCAL_IDEAS } from '../../config';

// TODO: local ideas
// TODO: remove console logs
function getInitialState({
  sentiment,
  isCustom,
  sentimentalIdeas,
  customIdeas,
}) {
  if (isCustom) {
    return shuffleArray(customIdeas);
  }
  if (sentiment) {
    const filteredIdeasForSentiment = Object.values(sentimentalIdeas).filter(
      (ideaWithSentiment) => ideaWithSentiment.sentiment === sentiment,
    );
    return shuffleArray(filteredIdeasForSentiment);
  }
  return [];
}

const ErrorComponent = () => (
  <Page>
    <View style={styles.oopsContainer}>
      <Icon name="error-outline" size={40} color={Colors.lightestGreyscale} />
      <Text style={styles.oopsText}>No ideas here</Text>
    </View>
  </Page>
);

function ActivityCardsScreen({
  navigation,
  route,
  customIdeas,
  sentimentalIdeas,
}) {
  const { options = {}, title = 'Explore Ideas' } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);
  const {
    isCustom = false,
    category = null,
    sentiment = NEUTRAL_SENTIMENT,
    startId = null,
  } = options;
  const [loading, setLoading] = useState(
    !isCustom && !sentiment ? true : false,
  );
  const [ideas, setIdeas] = useState(() =>
    getInitialState({ sentiment, isCustom, sentimentalIdeas, customIdeas }),
  );

  const startingIndex =
    isCustom && startId ? findIndexOfObjWithId(ideas, startId) : 0;
  const [index, setIndex] = useState(startingIndex);
  const [limboIdeas, setLimboIdeas] = useState([]);

  useEffect(() => {
    async function getIdeas() {
      try {
        let result = LOCAL_IDEAS
          ? getLocalIdeas(category)
          : await graphQLClient.request(
              category ? getQueryTodosInCategory(category) : getQueryTodosAll(),
            );
        const todos = category ? result?.category?.todos : result?.todos;
        if (todos) {
          setIdeas(shuffleArray(todos));
        }
      } catch (e) {
        console.log('Failed to get ideas', { e });
      }
      setLoading(false);
    }
    if (!isCustom && !sentiment) {
      getIdeas();
    }
  }, [isCustom, category, sentiment]);

  function incrementIndex() {
    const newIndex = index + 1;
    if (newIndex < ideas.length) {
      setIndex(index + 1);
    }
  }

  let idea = ideas[index];
  console.log({ idea });
  function conditionalAddToLimboForSentimentChange(newSentiment, id) {
    const indexInLimbo = limboIdeas.indexOf(id);
    const shouldBeInLimbo = sentiment && newSentiment !== sentiment;
    if (shouldBeInLimbo) {
      if (indexInLimbo === -1) {
        setLimboIdeas([...limboIdeas, id]);
      }
    } else if (indexInLimbo !== -1) {
      const limboIdeasCopy = [...limboIdeas];
      limboIdeasCopy.splice(indexInLimbo, 1);
      setLimboIdeas(limboIdeasCopy);
    }
  }

  function conditionalAddToLimboForDeleteIdea(id) {
    const indexInLimbo = limboIdeas.indexOf(id);
    if (indexInLimbo === -1) {
      setLimboIdeas([...limboIdeas, id]);
    }
  }

  function conditionalRemoveFromLimboForRestoreIdea(id) {
    const indexInLimbo = limboIdeas.indexOf(id);
    if (indexInLimbo !== -1) {
      let limboIdeasCopy = [...limboIdeas];
      limboIdeasCopy.splice(indexInLimbo, 1);
      setLimboIdeas(limboIdeasCopy);
    }
  }

  if ((index === -1 || !ideas || !ideas.length) && !loading) {
    return <ErrorComponent />;
  }
  if (!loading && ideas.length && index > ideas.length - 1) {
    setIndex(ideas.length - 1);
    return <Page padded={false} />;
  }
  return (
    <Page padded={false}>
      {loading || index > ideas.length - 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.lightestGreyscale} />
        </View>
      ) : (
        <>
          <IdeaCarousel
            limboIdeas={limboIdeas}
            ideas={ideas}
            setIndex={setIndex}
            index={index}
          />
          <ResponseBar
            idea={idea}
            isInLimbo={limboIdeas.includes(idea.id)}
            incrementIndex={incrementIndex}
            atEndOfIdeas={index === ideas.length - 1}
            index={index}
            onDeleteIdea={conditionalAddToLimboForDeleteIdea}
            onRestoreIdea={conditionalRemoveFromLimboForRestoreIdea}
            onSentimentChange={conditionalAddToLimboForSentimentChange}
            navigation={navigation}
          />
        </>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  oopsContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  oopsText: {
    marginTop: 30,
    fontSize: 20,
    color: Colors.lightestGreyscale,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.lightestGreyscale,
  },
});

export default connect(
  ({ ideas }) => ({
    sentimentalIdeas: ideas.sentimentalIdeas,
    customIdeas: ideas.customIdeas,
  }),
  // { doSetPublicIdeas: setPublicIdeas }, // remove reducer value?
)(ActivityCardsScreen);
