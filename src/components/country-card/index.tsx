import {Text} from 'native-base';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
interface ICountryCard {
  source: ImageSourcePropType;
  country: 'Korea' | 'VietNam';
}
const CountryCard = (props: ICountryCard) => {
  const {source, country} = props;
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.cardImage} accessibilityRole="button">
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
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default CountryCard;
