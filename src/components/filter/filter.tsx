import {HStack, Menu, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FilterIcon} from '../icons';
import {COLORS} from '../../constants/design-system';
type FilterItems = {
  label: string;
  value: string;
};

type Props = {
  filterItems: FilterItems[];
  onSelected: (value: FilterItems) => void;
  selectedValue?: FilterItems;
};

export const Filter = (props: Props) => {
  const [isShow, setIsShow] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<FilterItems>();
  const handleSelected = (value: FilterItems) => {
    setSelectedValue(prev => {
      if (prev && prev.value === value.value) {
        return undefined;
      }
      return value;
    });
    props.onSelected(value);
  };
  return (
    <Menu
      onOpen={() => setIsShow(true)}
      onClose={() => setIsShow(false)}
      overflow="hidden"
      shadow={2}
      padding={0}
      minW={46}
      rounded="lg"
      offset={8}
      placement="bottom left"
      trigger={triggerProps => {
        return (
          <TouchableOpacity {...triggerProps}>
            <HStack space={2} alignItems="center">
              <FilterIcon
                opacity={isShow ? 1 : 0.6}
                color={isShow ? COLORS.highlight : COLORS.text}
              />
              <Text
                opacity={isShow ? 1 : 0.6}
                color={isShow ? COLORS.highlight : COLORS.text}>
                Filter
                {selectedValue ? `: ${selectedValue.label}` : ''}
              </Text>
            </HStack>
          </TouchableOpacity>
        );
      }}>
      {props.filterItems.map((item, index) => (
        <Menu.Item
          bg={
            selectedValue && selectedValue.value === item.value
              ? '#D1D1D1'
              : 'transparent'
          }
          onPress={() => {
            handleSelected(item);
          }}
          borderBottomWidth={1}
          borderBottomColor={'white'}
          key={index}
          _pressed={{bg: '#D1D1D1'}}
          px={3}
          py={4}
          fontSize="md">
          <Text>{item.label}</Text>
        </Menu.Item>
      ))}
    </Menu>
  );
};
