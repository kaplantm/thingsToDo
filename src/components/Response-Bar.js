import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/colors';

function ResponseBar() {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="thumb-down"
        size={60}
        color={Colors.defaultPrimary}
      />
      <Icon
        name="thumb-up"
        style={styles.icon}
        size={60}
        color={Colors.defaultPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 20,
    marginBottom: 40,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
});
export default ResponseBar;
