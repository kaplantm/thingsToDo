import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, StyleSheet} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import IdeaCarousel from '../components/IdeaCarousel';
import Colors from '../../theme/colors';

const ErrorComponent = () => (
  <Page>
    <View style={styles.oopsContainer}>
      <Icon name="error-outline" size={40} color={Colors.lightestGreyscale} />
      <Text style={styles.oopsText}>No ideas here</Text>
    </View>
  </Page>
);

function ActivityCardsScreen({navigation, route, ideas}) {
  const [index, setIndex] = useState(0);
  const {filterKey = 'isCustom', filterValue = false} = route.params || {};
  console.log({filterKey, filterValue});
  // TODO: memo the carousel - doesnt care about likes, dislikeds ect

  function incrementIndex() {
    setIndex(index + 1);
  }
  if (!ideas || !ideas.length || index === -1) {
    return <ErrorComponent />;
  }

  const filteredIdeasList = ideas.filter(
    // eslint-disable-next-line eqeqeq
    (unfilteredIdea) => unfilteredIdea[filterKey] == filterValue,
  );
  const idea = filteredIdeasList[index];

  if (!filteredIdeasList || !filteredIdeasList.length) {
    return <ErrorComponent />;
  }
  return (
    <Page padded={false}>
      <IdeaCarousel
        ideas={filteredIdeasList}
        setIndex={setIndex}
        index={index}
      />
      <ResponseBar
        id={idea.id}
        liked={idea.liked}
        disliked={idea.disliked}
        incrementIndex={incrementIndex}
      />
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

export default connect(({ideas}) => ({
  ideas,
}))(ActivityCardsScreen);
