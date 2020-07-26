import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, StyleSheet} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import IdeaCarousel from '../components/IdeaCarousel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors, {hslaToTransparent} from '../../theme/colors';
function HomeScreen({navigation, ideas}) {
  function goToAllActivityCards() {
    navigation.push('Activity Cards'); // TODO: strings const
  }
  function goToNewIdea() {
    navigation.push('New Idea');
  }
  function goToLiked() {
    navigation.push('Activity Cards', {filterKey: 'liked', filterValue: true});
  }
  function goToDisliked() {
    navigation.push('Activity Cards', {
      filterKey: 'disliked',
      filterValue: true,
    });
  }
  function goToMyIdeas() {
    navigation.push('Activity Cards', {
      filterKey: 'isCustom',
      filterValue: true,
    });
  }
  return (
    <Page>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.btnContainer, styles.explore]}
          onPress={goToAllActivityCards}>
          <Text style={styles.btnText}>Explore</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My Activities</Text>
        <View style={styles.myStuffContainer}>
          <TouchableOpacity
            style={[styles.btnContainer, styles.myIdeas]}
            onPress={goToAllActivityCards}>
            <Text style={styles.btnText}>My Ideas</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={[styles.btnContainer, styles.liked]}>
              <TouchableOpacity onPress={goToLiked} style={styles.row}>
                <Icon
                  name="thumb-up"
                  size={30}
                  style={styles.icon}
                  color={Colors.lightestGreyscale}
                />
                <Text style={styles.btnTextMedium}>Liked</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.btnContainer, styles.disliked]}>
              <TouchableOpacity
                onPress={goToDisliked}
                style={[styles.row, styles.btnContainerSpread]}>
                <Icon
                  name="thumb-down"
                  size={30}
                  style={styles.icon}
                  color={Colors.lightestGreyscale}
                />
                <Text style={styles.btnTextMedium}>Disliked</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centerContainer}>
            <TouchableOpacity
              style={[styles.btnContainer, styles.add]}
              onPress={goToNewIdea}>
              <Icon
                name="add"
                size={30}
                style={styles.icon}
                color={Colors.lightestGreyscale}
              />
              <Text style={styles.btnTextSmall}>Add a new idea</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  centerContainer: {
    alignItems: 'center',
  },
  myStuffContainer: {
    paddingTop: 10,
    borderTopColor: hslaToTransparent(Colors.lightestGreyscale, 0.5),
    borderTopWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  explore: {
    backgroundColor: hslaToTransparent(Colors.orange, 0.75),
  },
  liked: {
    backgroundColor: hslaToTransparent(Colors.blue, 0.65),
    flex: 1,
  },
  myIdeas: {
    backgroundColor: hslaToTransparent(Colors.defaultPrimary, 0.75),
  },
  disliked: {
    backgroundColor: hslaToTransparent(Colors.lightGreyscale, 0.6),
    flex: 1,
  },
  add: {
    backgroundColor: hslaToTransparent(Colors.green, 0.75),
  },
  btnContainer: {
    borderColor: hslaToTransparent(Colors.lightestGreyscale, 0.2),
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnText: {
    fontSize: 40,
    letterSpacing: 1.2,
    color: Colors.lightestGreyscale,
  },
  btnTextMedium: {
    fontSize: 30,
    color: Colors.lightestGreyscale,
  },
  btnTextSmall: {
    fontSize: 20,
    color: Colors.lightestGreyscale,
  },
  title: {
    marginTop: 30,
    padding: 10,
    fontSize: 20,
    color: Colors.lightestGreyscale,
  },
  icon: {
    marginRight: 20,
  },
});

export default HomeScreen;
