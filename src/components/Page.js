import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../theme/colors';
import DismissKeyboard from './DismissKeyboard';

function Page({children, padded = true, withDismissKeyboard}) {
  const Wrapper = withDismissKeyboard ? DismissKeyboard : View;
  return (
    <Wrapper style={styles.page}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.page}>
        <SafeAreaView style={[styles.page]}>
          <View
            style={[
              styles.page,
              padded && styles.padded,
              // {backgroundColor: Colors.lightestGreyscale},
            ]}>
            {children}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  padded: {padding: 10},
});

export default Page;
