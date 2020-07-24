import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/colors';

function HomeHeaderRight({navigation}) {
  function goToMyIdeas() {
    navigation.push('My Ideas');
  }
  function goToNewIdea() {
    navigation.push('New Idea');
  }
  return (
    <View style={styles.container}>
      <Icon
        onPress={goToNewIdea}
        name="edit"
        style={styles.icon}
        size={30}
        color={Colors.lightestGreyscale}
      />
      <Icon
        onPress={goToMyIdeas}
        name="filter-list"
        style={styles.icon}
        size={30}
        color={Colors.lightestGreyscale}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  iconGroup: {
    // backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
});
export default HomeHeaderRight;
