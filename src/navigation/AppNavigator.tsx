import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home"
import Settings from "../screens/Settings";
import Actions from "../screens/Actions";
import News from "../screens/News";
import Portfolio from "../screens/Portfolio";
import Prices from "../screens/Prices";

import TabBar from "../components/TabBar";


const HomeStackNavigator = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen name="Home" component={Home}/>
            <HomeStackNavigator.Screen name="News" component={News}/>
        </HomeStackNavigator.Navigator>
    );
};


const TabBarNavigator = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <TabBarNavigator.Navigator tabBar={(props) => <TabBar {... props} />} >
            <TabBarNavigator.Screen name="Home" component={Home} />
            <TabBarNavigator.Screen name="Portfolio" component={Portfolio} />
            <TabBarNavigator.Screen name="Actions" component={Actions} />
            <TabBarNavigator.Screen name="Prices" component={Prices} />
            <TabBarNavigator.Screen name="Settings" component={Settings} />
        </TabBarNavigator.Navigator>
    )
}

const AppNavigator = () => {
    return(
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator;