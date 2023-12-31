import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../../constants/screen';
import CreateGroupScreen from '../listen/screens/group/create-group-screen';
import MainGroupScreen from '../listen/screens/group/main-group-screen';
import ListenDetailScreen from '../listen/screens/individual/listen-detail-screen';
import IndividualTab from '../listen/screens/individual/individual-tab';
import ListAudioListenScreen from '../listen/screens/individual/list-audio-screen';
import SearchListenScreen from '../listen/screens/individual/search-listen-screen';
import ListenScreen from '../listen/screens/listen-screen';
import DetailGroupScreen from '../listen/screens/group/detail-group-screen';

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
        name={SCREEN_NAMES.listenDetailScreen as any}
        component={ListenDetailScreen as any}
      />
      <Stack.Screen
        name={SCREEN_NAMES.listAudioListenScreen}
        component={ListAudioListenScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.mainGroup} component={MainGroupScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.detailGroup}
        component={DetailGroupScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.createGroup}
        component={CreateGroupScreen}
      />
    </Stack.Navigator>
  );
};
