import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {colors} from '../../consts';

type TypeButton = 'highlight' | 'transparent';
interface AppButtonProps {
  onPress?: () => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle> | undefined;
  textStyle?: TextStyle;
  type: TypeButton;
  fullWidth?: boolean;
  disabled?: boolean;
}

const AppButton: FC<AppButtonProps> = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  fullWidth,
  type = 'highlight',
  disabled,
}) => {
  const getTypeButton = (type: TypeButton) => {
    switch (type) {
      case 'highlight':
        return styles.buttonHighLight;

      case 'transparent':
        return styles.buttonTransparent;

      default:
        return styles.buttonHighLight;
    }
  };
  const getTypeText = (type: TypeButton) => {
    switch (type) {
      case 'highlight':
        return styles.buttonTextHighLight;

      case 'transparent':
        return styles.buttonTextTransparent;

      default:
        return styles.buttonHighLight;
    }
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        getTypeButton(type),
        styles.button,
        buttonStyle,
        fullWidth && {width: '100%'},
        disabled && {backgroundColor: '#bdd0f6'},
      ]}
      onPress={onPress}>
      <Text style={[getTypeText(type), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 160,
  },
  buttonHighLight: {
    padding: 10,
    backgroundColor: '#4080FF',
  },
  buttonTransparent: {
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonTextTransparent: {
    color: colors.highlight,
    fontSize: 16,
  },
  buttonTextHighLight: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppButton;
