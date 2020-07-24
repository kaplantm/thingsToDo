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
  },
  icon: {
    marginRight: 20,
    marginLeft: 20,
  },
});
export default ResponseBar;
