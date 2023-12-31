import {
  FormControl,
  IInputProps,
  Input as NBInput,
  Text,
  View,
} from 'native-base';
import {AlertCircle, XCircle} from 'react-native-feather';

import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {COLORS} from '../../constants/design-system';
import SearchIcon from '../icons/search-icon';

type Props = {
  label?: string;
  error?: string | boolean;
  typeInput?: 'text' | 'search';
} & IInputProps;

export const Input = ({
  label,
  error,
  value,
  onBlur,
  typeInput,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      {label && (
        <FormControl.Label>
          <Text fontWeight="semibold">{label}</Text>
        </FormControl.Label>
      )}

      <NBInput
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          onBlur && onBlur(e);
          setIsFocused(false);
        }}
        value={value}
        InputLeftElement={
          typeInput === 'search' ? (
            <View marginLeft={4}>
              <SearchIcon />
            </View>
          ) : (
            <></>
          )
        }
        InputRightElement={
          <>
            <View px={3}>
              {error && (
                <AlertCircle width={20} height={20} color={COLORS.error} />
              )}
              {isFocused && value && !error && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    props.onChangeText && props.onChangeText('');
                  }}>
                  <XCircle width={20} height={20} color={COLORS.text} />
                </TouchableWithoutFeedback>
              )}
            </View>
          </>
        }
      />
      {error && (
        <Text marginLeft={1} fontWeight="thin" color={COLORS.error}>
          {error}
        </Text>
      )}
    </View>
  );
};
