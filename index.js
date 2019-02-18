/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
    'Encountered an error loading page',
    'Task orphaned for request ',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Warning: Each',
    'Warning: Failed',
    'Require cycle',
]);

AppRegistry.registerComponent(appName, () => App);
