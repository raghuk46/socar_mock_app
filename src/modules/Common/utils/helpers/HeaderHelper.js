import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { isNull } from 'lodash';


export default (navigation, title, leftIcon, navigateTo) => ({
    title,
    headerBackTitle: null,
    headerLeft: leftIcon
        ? <TouchableOpacity 
            style={{ marginLeft: 22 }} 
            onPress={() => !isNull(navigateTo) 
                ? navigation.navigate(navigateTo)  
                : navigation.goBack(null)
            }>
            <Icon
                name={leftIcon}
                style={{ width: 24, height: 24, color: '#FFF', top: -10 }}
            />
        </TouchableOpacity>
        : null,
    headerStyle: {
        backgroundColor: '#0096CF',
        elevation: 0,
        borderBottomColor: '#b6b6b6',
        borderBottomWidth: 1,
        height: 36,
        shadowOffset: { width: 5, height: 8 },
        shadowColor: '#b6b6b6',
        shadowOpacity: 0.5,
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18,
        top: -10
    }
});