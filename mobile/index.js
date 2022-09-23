/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import React from 'react';

const AppWrapper = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppWrapper);
