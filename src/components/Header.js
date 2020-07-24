import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Colors from '../../theme/colors';

function Header() {
  const backgroundColor = Colors.darkPrimary;
  return (
    <SafeAreaView style={[{backgroundColor}]}>
      <View style={[styles.container, {backgroundColor}]}>
        <Text style={[styles.title, {color: Colors.lightestGreyscale}]}>
          Be Less Bored
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingBottom: 20,
    padding: 10,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
    // fontStyle: 'italic',
  },
});

export default Header;
