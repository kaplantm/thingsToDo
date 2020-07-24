import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Colors from '../../theme/colors';

function Page({children}) {
  return (
    <>
      <SafeAreaView
        style={[styles.pageSafeArea, {backgroundColor: Colors.darkPrimary}]}>
        <View
          style={[styles.page, {backgroundColor: Colors.lightestGreyscale}]}>
          {children}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: Colors.lightestGreyscale}} />
    </>
  );
}

const styles = StyleSheet.create({
  pageSafeArea: {
    flex: 1,
  },
  page: {
    flex: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    padding: 10,
    paddingTop: 20,
  },
});

export default Page;
