import React, {PureComponent} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Colors from '../../theme/colors';

const {width: screenWidth} = Dimensions.get('window');
const width = screenWidth;

export class CarouselItem extends PureComponent {
  static WIDTH = width;

  render = () => {
    const {
      // animatedValue,
      // itemIndex,
      text,
      icon,
      // categories,
      // liked,
      // disliked,
      // isCustom,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.card, {backgroundColor: Colors.lightPrimary}]}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'flex-start',
    overflow: 'visible',
    padding: 30,
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
