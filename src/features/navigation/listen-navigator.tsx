import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../../constants/screen';

import ListenScreen from '../listen/screens/listen-screen';

const Stack = createNativeStackNavigator();

export const ListenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.listen} component={ListenScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.searchListen}
        component={SearchListenScreen}
      />
    </Stack.Navigator>
  );
};
