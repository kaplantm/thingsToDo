import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';

function HomeScreen({navigation, ideas}) {
  console.log({ideas});
  return (
    <Page>
      {ideas.map(({text}) => (
        <Text>{text}</Text>
      ))}
      <ResponseBar />
    </Page>
  );
}

export default connect(({ideas}) => ({
  ideas,
}))(HomeScreen);
