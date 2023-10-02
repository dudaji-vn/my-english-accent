import {BottomNavigationBar} from './bottom-navigation-bar';
import {ListenScreen} from '../listen/screens';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {screenConfig} from '../../configs/screen-config';

const Tab = createBottomTabNavigator();

export const MainStack = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigationBar {...props} />}>
      <Tab.Screen name={screenConfig.name.listen} component={ListenScreen} />
      <Tab.Screen name={screenConfig.name.record} component={ListenScreen} />
      <Tab.Screen name={screenConfig.name.game} component={ListenScreen} />
      <Tab.Screen name={screenConfig.name.settings} component={ListenScreen} />
    </Tab.Navigator>
  );
};

// const SplashScreen = ({navigation}: {navigation: any}) => {
//   return (
//     <View>
//       <Button onPress={() => navigation.navigate(screenConfig.name.listen)}>
//         <Text>Go to Details</Text>
//       </Button>
//     </View>
//   );
// };
