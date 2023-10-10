import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {Pressable, Text} from 'native-base';
import {colors} from '../../consts';

interface ICountryCard {
  source: ImageSourcePropType;
  country: 'Korea' | 'VietNam';
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  isActive?: boolean;
}
const CountryCard = (props: ICountryCard) => {
  const {source, country, onPress, isActive} = props;
  return (
    <View style={[styles.wrapper]}>
      <Pressable
        onPress={onPress}
        style={[styles.cardImage, isActive && styles.cardActive]}>
        <Image source={source} style={styles.image} />
      </Pressable>

      <Text>{country}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  cardImage: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    opacity: 0.6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    borderColor: colors.highlight,

    opacity: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default CountryCard;
