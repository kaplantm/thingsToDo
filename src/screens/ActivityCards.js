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
import { getQueryTodosInCategory } from '../api/graphql/queries';

function getInitialState({
  sentiment,
  isCustom,
  sentimentalIdeas,
  customIdeas,
}) {
  if (isCustom) {
    return customIdeas;
  }
  if (sentiment) {
    const filter = Object.values(sentimentalIdeas).filter(
      (ideaWithSentiment) => ideaWithSentiment.sentiment === sentiment,
    );
    return filter;
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
  const {
    options = {
      isCustom: false,
      sentiment: 0,
      category: 'indoor',
      startIndex: 0,
    }, // TODO: rename to options and make category dyanmic
    title = 'Explore Ideas',
  } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);
  const { isCustom, category, sentiment, startIndex } = options;

  const [index, setIndex] = useState(startIndex || 0);
  const [loading, setLoading] = useState(
    !isCustom && !sentiment ? true : false,
  );
  console.log(' !isCustom && !sentiment', !isCustom && !sentiment, loading);
  const [ideas, setIdeas] = useState(() =>
    getInitialState({ sentiment, isCustom, sentimentalIdeas, customIdeas }),
  );
  const [limboIdeas, setLimboIdeas] = useState([]);

  useEffect(() => {
    async function getIdeas() {
      try {
        const data = await graphQLClient.request(
          getQueryTodosInCategory(category),
        );
        if (data?.category?.todos) {
          setIdeas(data?.category?.todos);
        }
      } catch (e) {
        console.log({ e });
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

  const idea = ideas[index];

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

  // TODO: don't show thumbs for custom ideas (edit / delete)
  if ((index === -1 || !ideas || !ideas.length) && !loading) {
    return <ErrorComponent />;
  }
  if (index > ideas.length - 1) {
    setIndex(ideas.length - 1);
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
            limboIdeas={limboIdeas} // TODO: ?
            ideas={ideas}
            setIndex={setIndex}
            index={index}
          />
          <ResponseBar
            idea={idea}
            incrementIndex={incrementIndex}
            atEndOfIdeas={index === ideas.length - 1}
            onSentimentChange={conditionalAddToLimboForSentimentChange}
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
