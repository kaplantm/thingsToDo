import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import {Dimensions} from 'react-native';
import IdeaCarousel from '../components/IdeaCarousel';

function HomeScreen({navigation, ideas}) {
  const [index, setIndex] = useState(0);

  const {width} = Dimensions.get('window');
  const contentOffset = 10;

  return (
    <Page>
      <IdeaCarousel ideas={ideas} />
      <ResponseBar />
    </Page>
  );
}

// {ideas.map(({text}) => (
//   <Text>{text}</Text>
// ))}
// <ResponseBar />

export default connect(({ideas}) => ({
  ideas,
}))(HomeScreen);
