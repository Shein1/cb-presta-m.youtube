import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import Video from './screens/video';
import Setting from './screens/settings';

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerStyle: {
          height: 65,
          backgroundColor: '#F11630',
          elevation: 4
        }
      }
    },
    Video: {
      screen: Video,
      navigationOptions: {
        headerStyle: {
          height: 65,
          backgroundColor: '#F11630',
          elevation: 4
        }
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        headerStyle: {
          height: 65,
          backgroundColor: '#F11630',
          elevation: 4
        }
      }
    }
  },

  {
    initialRouteName: 'Home'
  }
);

export default MainStack;
