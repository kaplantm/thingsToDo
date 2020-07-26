import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Colors from '../../theme/colors';

function Page({children, padded = true}) {
  return (
    <>
      <SafeAreaView
        style={[styles.page, {backgroundColor: Colors.darkPrimary}]}>
        <View
          style={[
            styles.page,
            padded && styles.padded,
            {backgroundColor: Colors.lightestGreyscale},
          ]}>
          {children}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: Colors.lightestGreyscale}} />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  padded: {padding: 10},
});

export default Page;
