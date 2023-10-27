import {HStack, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/design-system';
export type TabDataItem = {
  title: string;
  value: string;
};
type Props = {
  onValueChange?: (value: string) => void;
  tabItems: TabDataItem[];
  value?: string;
};

export const TabBar = ({onValueChange, tabItems, value = ''}: Props) => {
  const [selected, setSelected] = React.useState<string>(value);
  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <HStack rounded="xl" space={5} p={3} bg={COLORS.background}>
      {tabItems.map(item => {
        const isSelected = item.value === selected;
        return (
          <Pressable
            opacity={isSelected ? 1 : 0.3}
            onPress={() => {
              onValueChange && onValueChange(item.value);
              setSelected(item.value);
            }}
            borderColor={
              isSelected ? COLORS.highlight : COLORS.darkerBackground
            }
            bg={isSelected ? COLORS.background : COLORS.darkerBackground}
            rounded="md"
            alignItems="center"
            justifyContent="center"
            borderWidth={2}
            px={3}
            minW={17}
            minH={10}>
            <Text style={isSelected ? styles.text : styles.textInactive}>
              {item.title}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    color: COLORS.highlight,
  },
  textInactive: {
    fontWeight: '400',
    color: COLORS.text,
  },
});
