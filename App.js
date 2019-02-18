import React, { PureComponent } from 'react';
import { StatusBar, Platform as devicePaltform, View } from 'react-native';
import { StyleProvider, Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import getTheme from './native-base-theme/components';
import Platform from './native-base-theme/variables/platform';
import SOCAR from './src/index';

const STATUSBAR_HEIGHT = devicePaltform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const AppStatusBar = ({ backgroundColor, ...props}) => (
  <View style={{ height: STATUSBAR_HEIGHT, backgroundColor}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class App extends PureComponent {

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <StyleProvider style={getTheme(Platform)}>
        <Root style={{ backgroundColor: devicePaltform.OS === 'android' ? "#00AFE8" : "#FFF"}}>
          <AppStatusBar barStyle="dark-content" backgroundColor="#00AFE8" />
          <SOCAR />
        </Root>
      </StyleProvider>
    );
  }
}

export default App;