import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Colors from '../../theme/colors';

function Page({children}) {
  return (
    <SafeAreaView
      style={[styles.pageSafeArea, {backgroundColor: Colors.darkPrimary}]}>
      <View style={[styles.page, {backgroundColor: Colors.lightestGreyscale}]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageSafeArea: {
    flex: 1,
  },
  page: {
    flex: 1,
    margin: 20,
    marginTop: 50,
    borderRadius: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
});

export default Page;
