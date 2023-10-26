import {HStack, Menu, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/design-system';
import {FilterIcon} from '../icons';
export type FilterItems = {
  label: string;
  value: string;
  icon?: JSX.Element;
};

type Props = {
  filterItems: FilterItems[];
  onSelected: (value: FilterItems) => void;
  selectedValue?: FilterItems;
  icon?: JSX.Element;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'right top'
    | 'right bottom'
    | 'left top'
    | 'left bottom';
  marginTop?: number;
  marginLeft?: number;
  maxHeight?: number;
};

export const Filter = (props: Props) => {
  const [isShow, setIsShow] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<FilterItems>();
  const handleSelected = (value: FilterItems) => {
    setSelectedValue(prev => {
      if (prev && prev.value === value.value) {
        props.onSelected({label: '', value: ''});
        return undefined;
      }
      props.onSelected(value);
      return value;
    });
  };
  const {icon} = props;

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
            {icon ? (
              icon
            ) : (
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
            )}
          </TouchableOpacity>
        );
      }}
      {...props}>
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
          {item.icon ? (
            <HStack space={2}>
              {item?.icon}
              <Text>{item.label}</Text>
            </HStack>
          ) : (
            <Text>{item.label}</Text>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );
};
