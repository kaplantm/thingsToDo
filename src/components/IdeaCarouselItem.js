import React, {PureComponent} from 'react';
import {Dimensions, StyleSheet, Text, Animated, View} from 'react-native';
import Colors from '../../theme/colors';

const {width: screenWidth} = Dimensions.get('window');
const width = screenWidth;

export class CarouselItem extends PureComponent {
  static WIDTH = width - 60;
  state = {
    navigationAnimation: new Animated.Value(0),
  };

  render = () => {
    const {
      animatedValue,
      itemIndex,
      text,
      icon,
      isInLimbo,
      // categories,
      // liked,
      // disliked,
      // isCustom,
    } = this.props;
    const minOpacity = isInLimbo ? 0.25 : 0.5;
    const maxOpacity = isInLimbo ? 0.5 : 1;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: animatedValue.interpolate({
              inputRange: [itemIndex - 1, itemIndex, itemIndex + 1],
              outputRange: [minOpacity, maxOpacity, minOpacity],
            }),
            marginTop: animatedValue.interpolate({
              inputRange: [itemIndex - 1, itemIndex, itemIndex + 1],
              outputRange: [30, 0, 30],
            }),
          },
        ]}>
        <View style={[styles.card, {backgroundColor: Colors.lightPrimary}]}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: CarouselItem.WIDTH,
    justifyContent: 'flex-start',
    overflow: 'visible',
    padding: 10,
    paddingTop: 20,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 100,
  },
  text: {
    fontSize: 32,
    letterSpacing: 1.2,
    marginTop: 30,
    marginBottom: 50,
  },
});
