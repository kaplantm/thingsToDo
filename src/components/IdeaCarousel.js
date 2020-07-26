import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Page from '../components/Page';
import ResponseBar from '../components/Response-Bar';
import {Dimensions} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import {CarouselItem} from './IdeaCarouselItem';

const {width} = Dimensions.get('window');

function IdeaCarousel({ideas}) {
  const [index, setIndex] = useState(0);

  return (
    <SideSwipe
      useVelocityForIndex={false}
      data={ideas}
      style={{flex: 1, width}}
      itemWidth={CarouselItem.WIDTH}
      threshold={CarouselItem.WIDTH / 4}
      extractKey={(item) => item.name}
      contentOffset={0}
      useNativeDriver={false}
      onIndexChange={(newIndex) => setIndex(index + 1)}
      renderItem={({item, ...rest}) => <CarouselItem {...rest} {...item} />}
    />
  );
}

export default IdeaCarousel;
