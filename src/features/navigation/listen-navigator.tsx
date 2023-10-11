import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../../constants/screen';
import SearchListenScreen from '../listen/screens/individual/search-listen-screen';
import ListenScreen from '../listen/screens/listen-screen';
import InvididualDetailScreen from '../listen/screens/individual/individual-detail-screen';
import IndividualTab from '../listen/screens/individual/individual-tab';
import ListAudioListenScreen from '../listen/screens/individual/list-audio-screen';
import MainGroupScreen from '../listen/screens/group/main-group-screen';

const Stack = createNativeStackNavigator();

export const ListenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.listen} component={ListenScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.searchListen}
        component={SearchListenScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.individual} component={IndividualTab} />
      <Stack.Screen
        name={SCREEN_NAMES.individualDetail}
        component={InvididualDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.listAudioListenScreen}
        component={ListAudioListenScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.mainGroup} component={MainGroupScreen} />
    </Stack.Navigator>
  );
};
