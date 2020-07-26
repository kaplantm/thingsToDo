import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import Colors, { hslaToTransparent } from '../../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

function NewIdeaScreen({ navigation }) {
  const [value, onChangeText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Page withDismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.info}>
          New ideas will appear in under "My Ideas" and will be added to your
          "Liked" list.
        </Text>

        <TextInput
          maxLength={100}
          multiline
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Type your idea here..."
        />

        <View style={styles.switchContainer}>
          <Switch
            trackColor={{
              false: Colors.darkPrimary,
              true: Colors.medPrimary,
            }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={[styles.info, styles.marginLeft]}>
            Submit to app (public for everyone to see).
          </Text>
        </View>

        <TouchableOpacity style={[styles.saveBtn, !value && styles.disabled]}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
      {isEnabled && (
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
    margin: 20,
    padding: 10,
    borderRadius: 10,
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
});

export default NewIdeaScreen;
