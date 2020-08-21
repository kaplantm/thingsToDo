import React, { useState, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import Page from '../components/Page';
import Colors, { hslaToTransparent } from '../../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { upsertIdea } from '../redux/slices/ideas';
import database from '@react-native-firebase/database';
// import graphQLClient from '../api/graphql/client';
// import { getQueryAddSuggestion } from '../api/graphql/queries';

function NewIdeaScreen({
  route,
  navigation,
  doUpsertIdea,
  customIdeasLength,
  user,
}) {
  const { idea = {}, title = 'New Idea' } = route.params || {};

  useEffect(() => {
    // assure auth isn't expired
    auth().currentUser.getIdToken();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const [state, setState] = useState({
    text: idea.text,
    isEnabled: false,
    isSaved: false,
  });
  const toggleSwitch = () =>
    setState((previousState) => ({
      ...previousState,
      isEnabled: !previousState.isEnabled,
    }));

  function onClickSave() {
    const upsertIdeaId = idea.id || new Date().getTime();
    doUpsertIdea({ text: state.text, id: upsertIdeaId });

    setState((previousState) => ({
      ...previousState,
      isSaved: true,
    }));

    if (state.isEnabled) {
      try {
        // graphQLClient.request(getQueryAddSuggestion(state.text));
        const newReference = database().ref('/').push();
        newReference.set(state.text).then(() => console.log('Data updated.'));
      } catch (e) {
        console.log('Failed to submit suggestion');
      }
    }

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home' },
            {
              name: 'Activity Cards',
              params: {
                options: { isCustom: true, startId: upsertIdeaId },
                title: 'My Ideas',
              },
            },
          ],
        }),
      );
    }, 500);
  }
  function onChangeText(text) {
    setState((previousState) => ({
      ...previousState,
      text,
    }));
  }
  return (
    <Page withDismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.info}>
          Custom ideas will appear in under "My Ideas".
        </Text>

        <TextInput
          maxLength={100}
          multiline
          style={styles.textInput}
          onChangeText={onChangeText}
          value={state.text}
          placeholder="Type your idea here..."
        />

        {!idea.id && (
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{
                false: Colors.darkPrimary,
                true: Colors.medPrimary,
              }}
              onValueChange={toggleSwitch}
              value={state.isEnabled}
            />
            <Text style={[styles.info, styles.marginLeft]}>
              Submit to app (public for everyone to see).
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={state.isSaved ? null : onClickSave}
          style={[
            styles.saveBtn,
            (!state.text || state.isSaved) && styles.disabled,
          ]}>
          <Text
            style={[
              styles.saveBtnText,
              (!state.text || state.isSaved) && styles.disabledText,
            ]}>
            {state.isSaved ? 'Saved!' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
      {state.isEnabled && (
        <View style={styles.weWillReviewContainer}>
          <Text style={[styles.info, styles.weWillReview]}>
            We will review your idea and consider adding it to our next release
            of the app.{' '}
            <Text style={styles.bold}>
              Do not submit any personal information.
            </Text>
          </Text>
        </View>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: hslaToTransparent(Colors.lightestGreyscale, 0.75),
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  weWillReviewContainer: {
    backgroundColor: hslaToTransparent(Colors.lightestGreyscale, 0.1),
    borderColor: hslaToTransparent(Colors.lightestGreyscale, 0.4),
    borderWidth: 1,
    marginTop: 0,
    margin: 20,
    padding: 10,
    borderRadius: 5,
  },
  info: {
    color: Colors.darkPrimary,
    flexShrink: 1,
  },
  textInput: {
    height: 150,
    fontSize: 20,
    backgroundColor: hslaToTransparent(Colors.darkPrimary, 0.1),
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    paddingTop: 10,
  },
  title: {
    marginTop: 30,
    padding: 10,
    fontSize: 20,
    color: Colors.lightestGreyscale,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  weWillReview: {
    opacity: 0.75,
    fontStyle: 'italic',
    color: Colors.lightestGreyscale,
  },
  bold: {
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: 20,
    borderColor: hslaToTransparent(Colors.lightestGreyscale, 0.2),
    backgroundColor: Colors.defaultPrimary,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: {
    backgroundColor: hslaToTransparent(Colors.defaultPrimary, 0.5),
  },
  saveBtnText: {
    fontSize: 30,
    color: Colors.lightestGreyscale,
  },
  disabledText: {
    opacity: 0.4,
  },
});

export default connect(
  ({ ideas, user }) => ({
    user,
    customIdeasLength: ideas.customIdeas.length,
  }),
  {
    doUpsertIdea: upsertIdea,
  },
)(NewIdeaScreen);
