import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import Stack from './routes';
import configureStore from './redux/store';

const store = configureStore();

const SOCAR = () => <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
        <Stack />
    </SafeAreaView>
</Provider>

export default SOCAR;