import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import IdeaCarousel from '../components/IdeaCarousel';
import Colors from '../../theme/colors';
import { findIndexOfObjWithAttr } from '../utils';

function filterIdeas(ideas, filterKey, filterValue) {
  return ideas && ideas.length
    ? ideas.filter(
        // eslint-disable-next-line eqeqeq
        (unfilteredIdea) => unfilteredIdea[filterKey] == filterValue,
      )
    : [];
}

const ErrorComponent = () => (
  <Page>
    <View style={styles.oopsContainer}>
      <Icon name="error-outline" size={40} color={Colors.lightestGreyscale} />
      <Text style={styles.oopsText}>No ideas here</Text>
    </View>
  </Page>
);

function ActivityCardsScreen({ navigation, route, ideas }) {
  const [index, setIndex] = useState(0);
  const [limboIdeas, setLimboIdeas] = useState([]);
  const { filterKey = 'isCustom', filterValue = false } = route.params || {};
  console.log({ filterKey, filterValue });
  // TODO: memo the carousel - doesnt care about likes, dislikeds ect

  function incrementIndex() {
    setIndex(index + 1);
  }

  const unstableFilterIdeas = filterIdeas(ideas, filterKey, filterValue);

  const filteredIdeasList = useMemo(
    () => filterIdeas(ideas, filterKey, filterValue),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterKey, filterValue],
  );

  const idea = filteredIdeasList[index];
  const indexInUnstableFilterIdeas = findIndexOfObjWithAttr(
    unstableFilterIdeas,
    idea.id,
  );
  const isInLimbo = indexInUnstableFilterIdeas === -1;

  console.log({ isInLimbo });
  if (index === -1 || !filteredIdeasList || !filteredIdeasList.length) {
    return <ErrorComponent />;
  }
  return (
    <Page padded={false}>
      <IdeaCarousel
        isInLimbo={isInLimbo}
        ideas={filteredIdeasList}
        setIndex={setIndex}
        index={index}
      />
      <ResponseBar id={idea.id} incrementIndex={incrementIndex} />
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

export default connect(({ ideas }) => ({
  ideas,
}))(ActivityCardsScreen);
