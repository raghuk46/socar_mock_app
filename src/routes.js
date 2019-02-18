import React from 'react';
import { createSwitchNavigator,  createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import { AuthLoading, Login, SignUp, Splash } from './modules/Auth';
import Home from './modules/Home/scenes/Home';
import Search from './modules/Home/scenes/Search';
import HomeStack from './modules/Home';
import { Profile, Settings } from './modules/User';

const Authorized = createBottomTabNavigator(
    {
        Home: Home,
        Search: Search,
        Profile: Profile,
        Settings: Settings
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName, iconType;
                if (routeName === 'Home') {
                    iconName = 'home';
                    iconType = 'AntDesign';
                } else if (routeName === 'Search') {
                    iconName = 'car';
                    iconType = 'FontAwesome5';
                } else if (routeName === 'Profile') {
                    iconName = 'user';
                    iconType = 'FontAwesome5';
                } else if (routeName === 'Settings') {
                    iconName = 'setting';
                    iconType = 'AntDesign';
                }

                return <Icon name={iconName} type={iconType} style={{ fontSize: horizontal ? 20 : 25 , color: tintColor }} />
            },
        }),
        tabBarOptions: {
            activeTintColor: '#00AFE8',
            inactiveTintColor: '#b6b6b6'
        }
    }
);

const unAuthorized = createStackNavigator(
    {
        Splash: Splash,
        Login: Login,
        SignUp: SignUp
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: Authorized,
        HomeStack: HomeStack,
        Auth: unAuthorized
    },
    {
        headerMode: 'none',
        initialRouteName: 'AuthLoading'
    }
));