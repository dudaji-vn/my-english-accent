import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {colors} from '../../consts';

type TypeButton = 'highlight' | 'transparent';
interface AppButtonProps {
  onPress?: () => void;
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  type: TypeButton;
}

const AppButton: FC<AppButtonProps> = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  type = 'highlight',
}) => {
  const getTypeButton = (type: TypeButton) => {
    switch (type) {
      case 'highlight':
        return styles.buttonHighLight;

      case 'transparent':
        return styles.buttonTransparent;

      default:
        return styles.button;
    }
  };
  const getTypeText = (type: TypeButton) => {
    switch (type) {
      case 'highlight':
        return styles.buttonTextHighLight;

      case 'transparent':
        return styles.buttonTextTransparent;

      default:
        return styles.button;
    }
  };
  return (
    <TouchableOpacity
      style={[getTypeButton(type), buttonStyle]}
      onPress={onPress}>
      <Text style={[getTypeText(type), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonHighLight: {
    backgroundColor: '#4080FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonTransparent: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonTextTransparent: {
    color: colors.highlight,
  },
  buttonTextHighLight: {
    color: 'white', // Default text color
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white', // Default text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppButton;
