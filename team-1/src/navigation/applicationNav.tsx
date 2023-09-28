import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { DUMMY_DATA } from '../shared/const/dummyData';
import { RootNavigator, AuthNavigator } from './stackNav';

export default function ApplicationNavigator({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const isAuth = false;

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {DUMMY_DATA ? (
        <RootNavigator />
      ) : isAuth ? (
        <RootNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}


