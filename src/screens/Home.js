import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';

function HomeScreen({navigation}) {
  return (
    <Page>
      <Text>Home Screen</Text>
      <ResponseBar />
    </Page>
  );
}

export default HomeScreen;
