import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './scenes/Home';
import Search from './scenes/Search';
import Reservation from './scenes/Reservation';

import { CustomizeHeader } from '../Common';

const iconBack = 'ios-arrow-back';
const iconClose = 'md-close';


const Stack = createStackNavigator(
    {
        Reservation: { 
            screen: Reservation,
            navigationOptions: ({ navigation }) => CustomizeHeader(navigation, 'MAKE RESERVATION', iconBack, 'Search'),
        }
    }
);

export default Stack;