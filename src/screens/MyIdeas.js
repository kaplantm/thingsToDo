import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Page from '../components/Page';
import Colors from '../../theme/colors';

function MyIdeas() {
  const [state, setState] = useState({liked: undefined});
  return (
    <Page>
      <View style={[styles.tabContainer, {borderColor: Colors.lightGreyscale}]}>
        <TouchableOpacity
          onPress={() => {
            console.log('click');
            setState({liked: undefined});
          }}
          style={[
            styles.tab,
            {
              borderColor: Colors.lighterGreyscale,
              backgroundColor:
                state.liked === undefined
                  ? Colors.lightPrimary
                  : Colors.lightestGreyscale,
            },
          ]}>
          <Text>Custom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('click');
            setState({liked: true});
          }}
          style={[
            styles.tab,
            {
              borderColor: Colors.lighterGreyscale,
              backgroundColor: state.liked
                ? Colors.lightPrimary
                : Colors.lightestGreyscale,
            },
          ]}>
          <Text>Liked</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setState({liked: false})}
          style={[
            styles.tab,
            styles.lastTab,
            {
              backgroundColor:
                state.liked === false
                  ? Colors.lightPrimary
                  : Colors.lightestGreyscale,
            },
          ]}>
          <Text>Disliked</Text>
        </TouchableOpacity>
      </View>
      <Text>MyIdeas Screen</Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 2,
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    padding: 10,
    // borderRadius: 5,
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0,
    borderRightWidth: 1,
    alignItems: 'center',
  },
  lastTab: {
    borderRightWidth: 0,
    // borderRadius: 0,
    // borderTopRightRadius: 5,
    // borderBottomRightRadius: 5,
  },
  backArrow: {
    marginLeft: 20,
  },
});
export default MyIdeas;
