import {Text} from 'native-base';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
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
      <TouchableOpacity
        onPress={onPress}
        style={[styles.cardImage, isActive && styles.cardActive]}
        accessibilityRole="button">
        <Image source={source} style={styles.image} />
      </TouchableOpacity>
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowColor: '#161616',
    elevation: 4,
  },
  cardActive: {
    borderColor: colors.highlight,
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default CountryCard;
