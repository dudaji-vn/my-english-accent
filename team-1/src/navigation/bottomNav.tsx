import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { HOME, ABOUT } from "../@types/router";
import { RootTabParamList, RootTabScreenProps } from "../@types/screenNavigator";
import Home from "../screens/Home/Home";

const BottomTab = createBottomTabNavigator<RootTabParamList>();
export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName={HOME}
            screenOptions={{
                tabBarActiveTintColor: Colors['light'].tint,
                headerTitleAlign: 'center',
            }}>
            <BottomTab.Screen
                name={HOME}
                component={Home}
                options={({ navigation }: RootTabScreenProps<typeof HOME>) => ({
                    tabBarShowLabel: false,
                    title: 'Trang chủ',
                })}
            />
            <BottomTab.Screen
                name={ABOUT}
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    title: 'Tìm kiếm',
                }}
            />
        </BottomTab.Navigator>
    );
}