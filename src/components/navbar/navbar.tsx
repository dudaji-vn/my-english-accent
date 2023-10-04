import {HStack, View} from 'native-base';

import {Animated} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {NavbarButton} from '../../components/navbar/navbar-button';
import {NavbarButtonActive} from './navbar-button-active';
import React from 'react';

export const Navbar = ({
  state,
  navigation,
  routeIconsMap,
}: BottomTabBarProps & {routeIconsMap: {[key: string]: React.FC}}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const positionLeft = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.spring(positionLeft, {
      toValue: 9.5 + 90 * activeIndex,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, positionLeft]);
  return (
    <View position="absolute" bottom={0} left={0} right={0}>
      <HStack justifyContent="space-between" position="relative">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true, params: {}});
            }
            setActiveIndex(index);
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <NavbarButton
              route={route}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              key={route.key}>
              {React.createElement(routeIconsMap[route.name])}
            </NavbarButton>
          );
        })}
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            transform: [{translateX: positionLeft}],
          }}>
          <NavbarButtonActive
            route={state.routes[0]}
            onPress={() => {}}
            isFocused
          />
        </Animated.View>
      </HStack>
    </View>
  );
};
