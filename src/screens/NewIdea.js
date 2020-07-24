import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';

function NewIdeaScreen({navigation}) {
  return (
    <Page>
      <Text>Submit a new idea! It will appear in your "Liked" list.</Text>

      <Text>Submit to our app.</Text>

      <Text>
        We will review your idea and consider adding it to our next release of
        the app. Do not submit any personal information.
      </Text>
    </Page>
  );
}

export default NewIdeaScreen;
