import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import IdeaCarousel from '../components/IdeaCarousel';
import Colors from '../../theme/colors';
import { setPublicIdeas } from '../redux/slices/ideas';
import getLocalIdeas from '../lib/getIdeasLocal';

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
  publicIdeas,
  doSetPublicIdeas,
}) {
  const {
    filterRequirement = { isCustom: false, disliked: true },
    title = 'Explore Ideas',
  } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);
  const { isCustom } = filterRequirement;

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [limboIdeas, setLimboIdeas] = useState([]);

  useEffect(() => {
    // TODO: future, do api request
    // const ideas = isCustom ?
    // TODO: handle filter in reducer? doFilterViewableFromLocalIdeas doFilterViewableFromCustomIdeas
    // TODO: put in thunks
    const localIdeas = getLocalIdeas({ isCustom });
    // console.log({ localIdeas });
    doSetPublicIdeas({ publicIdeas: localIdeas });
    setLoading(false);
    // console.log('use effect', filterRequirement);
  }, [isCustom, doSetPublicIdeas]);

  function incrementIndex() {
    setIndex(index + 1);
  }
  // const filteredIdeasList = useMemo(
  //   () => filterIdeas(ideas, filterFunction),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [filterFunction],
  // );

  const idea = publicIdeas[index];

  function conditionalAddToLimbo(fullListIdeaIndex) {
    // const changedIdea = ideas[fullListIdeaIndex];
    // const indexInLimbo = limboIdeas.indexOf(changedIdea.id);
    // const passesFilter = filterFunction(changedIdea);
    // if (!passesFilter) {
    //   if (indexInLimbo === -1) {
    //     console.log('conditionalAddToLimbo', 1);
    //     setLimboIdeas([...limboIdeas, changedIdea.id]);
    //   }
    // } else {
    //   if (indexInLimbo !== -1) {
    //     const limboIdeasCopy = [...limboIdeas];
    //     limboIdeasCopy.splice(indexInLimbo, 1);
    //     setLimboIdeas(limboIdeasCopy);
    //   }
    // }
  }

  if (index === -1 || !publicIdeas || !publicIdeas.length) {
    return <ErrorComponent />;
  }
  return (
    <Page padded={false}>
      {loading ? (
        <Text>Loading...</Text> // TODO: format
      ) : (
        <>
          <IdeaCarousel
            limboIdeas={limboIdeas}
            ideas={publicIdeas}
            setIndex={setIndex}
            index={index}
          />
          <ResponseBar
            id={idea.id}
            incrementIndex={incrementIndex}
            conditionalAddToLimbo={conditionalAddToLimbo}
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
});

export default connect(
  ({ ideas }) => ({
    publicIdeas: ideas.publicIdeas,
  }),
  { doSetPublicIdeas: setPublicIdeas },
)(ActivityCardsScreen);
