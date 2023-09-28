import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROOT, NOT_FOUND, LOGIN, REGISTER } from "../@types/router";
import { RootStackParamList } from "../@types/screenNavigator";
import NotFound from "../screens/NotFoundScreen/NotFoundScreen";
import BottomTabNavigator from "./bottomNav";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ROOT}
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NOT_FOUND}
                component={NotFound}
                options={{ title: 'Oops!' }}
            />
        </Stack.Navigator>
    );
}

export function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={LOGIN} component={Login} />
            <Stack.Screen name={REGISTER} component={Register} />
        </Stack.Navigator>
    );
}
