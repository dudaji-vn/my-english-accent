import {Animated, TouchableOpacity} from 'react-native';
import {
  CogIcon,
  GamepadIcon,
  HeadphoneIcon,
  MicrophoneIcon,
} from '../../components/icons';
import {HStack, View} from 'native-base';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';

type RouteIconsMap = {
  [key: string]: React.FC;
};
const routeIconsMap = {
  listen: HeadphoneIcon,
  record: MicrophoneIcon,
  game: GamepadIcon,
  settings: CogIcon,
} as RouteIconsMap;

export const BottomNavigationBar = ({state, navigation}: BottomTabBarProps) => {
  return (
    <View bg="primary" height={16}>
      <View
        style={{
          width: 64,
          height: 64,
        }}
        padding={1}
        top={-32}
        bg="white"
        position="absolute"
        rounded="full"
        left={5}>
        <View
          width="full"
          height="full"
          rounded="full"
          justifyContent="center"
          alignItems="center"
          bg="highlight"
        />
      </View>
      <HStack px={5} justifyContent="space-between">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true, params: {}});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              route={route}
              isFocused={isFocused}>
              {React.createElement(routeIconsMap[route.name])}
            </TabItem>
          );
        })}
      </HStack>
    </View>
  );
};

const TabItem = ({
  route,
  isFocused,
  children,
  onPress,
  onLongPress,
}: {
  route: any;
  isFocused: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
}) => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: isFocused ? -32 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused, translateY]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Animated.View
        style={{
          transform: [{translateY}],
        }}>
        <View
          flexShrink={0}
          rounded="full"
          style={{
            width: 64,
            height: 64,
            backgroundColor: 'transparent',
          }}
          key={route.key}
          justifyContent="center"
          alignItems="center">
          <View
            width="full"
            height="full"
            rounded="full"
            justifyContent="center"
            alignItems="center">
            {children}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
