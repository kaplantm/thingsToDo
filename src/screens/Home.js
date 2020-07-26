import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import IdeaCarousel from '../components/IdeaCarousel';

function HomeScreen({navigation, ideas}) {
  // console.log(ideas);
  const [index, setIndex] = useState(0);
  const idea = ideas[index];
  // TODO: memo the carousel - doesnt care about likes, dislikeds ect
  return (
    <Page padded={false}>
      <IdeaCarousel ideas={ideas} setIndex={setIndex} />
      <ResponseBar id={idea.id} liked={idea.liked} disliked={idea.disliked} />
    </Page>
  );
}

export default connect(({ideas}) => ({
  ideas,
}))(HomeScreen);
