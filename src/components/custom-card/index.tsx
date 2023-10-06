import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../consts';
import {Pressable} from 'native-base';

interface ICountryCardProps {
  source?: ImageSourcePropType;
  title?: string;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  cardImageStyle?: StyleProp<ViewStyle> | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  isActive?: boolean;
}

const CustomCard = (props: ICountryCardProps) => {
  const {source, containerStyle, cardImageStyle, title, onPress, isActive} =
    props;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {source && (
        <Pressable
          onPress={onPress}
          style={[
            styles.cardImage,
            cardImageStyle,
            isActive && styles.cardActive,
          ]}
          accessibilityRole="button">
          <Image
            source={source}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </Pressable>
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
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 4,
    height: 160,
    width: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    borderColor: colors.highlight,
  },
  textContainer: {
    alignItems: 'center',
    color: colors.text,
  },
});

export default CustomCard;
