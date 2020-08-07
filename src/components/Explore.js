import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors, { hslaToTransparent } from '../../theme/colors';
import categoryButtons from '../constants/category-buttons';
import { NEUTRAL_SENTIMENT } from '../constants/likes';

function Explore({ navigation, ideas }) {
  function goToAllActivityCards() {
    navigation.push('Activity Cards'); // TODO: strings const
  }
  function goToAllActivityCardsByCategory(category, title) {
    navigation.push('Activity Cards', {
      options: { isCustom: false, sentiment: NEUTRAL_SENTIMENT, category },
      title,
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const categorySize = windowWidth / 2 - 40;

  return (
    <View>
      <TouchableOpacity
        style={[styles.btnContainer, styles.explore]}
        onPress={goToAllActivityCards}>
        <Text style={styles.btnText}>All Categories</Text>
      </TouchableOpacity>
      {categoryButtons.map((buttonGroup) => {
        return (
          <View style={styles.row} key={`${buttonGroup[0].name}Group`}>
            {buttonGroup.map((button) => (
              <View
                style={[
                  styles.btnContainer,
                  styles.category,
                  { backgroundColor: button.color },
                ]}
                key={button.name}>
                <TouchableOpacity
                  onPress={() =>
                    goToAllActivityCardsByCategory(button.name, button.label)
                  }
                  style={styles.row}>
                  <Image
                    style={[
                      styles.categoryImage,
                      {
                        width: categorySize,
                        height: categorySize,
                      },
                    ]}
                    source={button.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={[
                      'hsla(221, 35%, 46%, 0)',
                      'hsla(221, 44%, 41%, .25)',
                      'hsla(224, 62%, 26%, .35)',
                      'hsla(224, 62%, 26%, .75)',
                    ]}
                    useAngle
                    angle={-35}
                    style={styles.categoryGradient}
                  />
                  <Text style={[styles.btnTextMedium, styles.categoryText]}>
                    {button.label}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  centerContainer: {
    alignItems: 'center',
  },
  dividedContainer: {
    paddingTop: 10,
    borderTopColor: hslaToTransparent(Colors.lightestGreyscale, 0.5),
    borderTopWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  explore: {
    backgroundColor: hslaToTransparent(Colors.orange, 0.75),
  },
  categoryImage: {
    // width: '100%',
    // height: '100%',
    maxWidth: '100%',
    // opacity: 0.75,
    // maxHeight: 200,
    // flex: 1,
  },
  categoryText: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  categoryGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  liked: {
    backgroundColor: hslaToTransparent(Colors.blue, 0.65),
    flex: 1,
  },
  category: {
    // flex: 1,
    padding: 0,
    borderColor: hslaToTransparent(Colors.lightestGreyscale, 0.75),
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

export default Explore;
