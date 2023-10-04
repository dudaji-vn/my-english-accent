import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../consts';

interface ICountryCardProps {
  source?: ImageSourcePropType;
  title?: string;
  containerStyle?: any;
  imageStyle?: any;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CustomCard = (props: ICountryCardProps) => {
  const {source, containerStyle, imageStyle, title, onPress} = props;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {source && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.cardImage, imageStyle]}
          accessibilityRole="button">
          <Image
            source={source}
            style={{flex: 1, width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {title && <Text>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  cardImage: {
    backgroundColor: colors.lighterBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 40,
    marginBottom: 4,
    width: 100,
    height: 160,
  },
  textContainer: {
    alignItems: 'center',
  },
});

export default CustomCard;
