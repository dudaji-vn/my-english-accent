import {HStack, View} from 'native-base';

import {Animated, useWindowDimensions} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {NavbarButton} from '../../components/navbar/navbar-button';
import {NavbarButtonActive} from './navbar-button-active';
import React from 'react';

export const Navbar = ({
  state,
  navigation,
  routeIconsMap,
  activeRouteIconsMap,
}: BottomTabBarProps & {
  activeRouteIconsMap: {[key: string]: React.FC};
  routeIconsMap: {[key: string]: React.FC};
}) => {
  const screenWidth = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const positionLeft = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const toValue = activeIndex * 96;
    Animated.spring(positionLeft, {
      toValue: toValue,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, positionLeft, screenWidth]);
  return (
    <View position="absolute" bottom={0} left={0} right={0} height={16}>
      <HStack
        justifyContent="center"
        w={96}
        alignSelf="center"
        position="relative">
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
              <>
                {isFocused
                  ? React.createElement(activeRouteIconsMap[route.name])
                  : React.createElement(routeIconsMap[route.name])}
              </>
            </NavbarButton>
          );
        })}
        <View
          position="absolute"
          bg="primary"
          left={0}
          height={16}
          w={10}
          style={{
            transform: [
              {
                translateX: -40,
              },
            ],
          }}
        />
        <View
          position="absolute"
          bg="primary"
          right={0}
          height={16}
          w={10}
          style={{
            transform: [
              {
                translateX: 40,
              },
            ],
          }}
        />

        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: 96,
            left: 0,
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
