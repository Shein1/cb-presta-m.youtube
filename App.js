import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/home';
import Video from './screens/video';
import Setting from './screens/settings';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import reducer from './constants/actions.js';

const initState = {
  isSearchTerms: false
};

const store = createStore(reducer);

function reducer(prev_state = initState, action) {
  switch (action.type) {
    case 'SEARCH':
      return Object.assign({}, prev_state, {
        isSearchTerms: true
      });
  }
  return prev_state;
}

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

export default class App extends React.Component {
  async getStorage(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(error);
      alert('Unable to save');
    }
  }

  async addStorage(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
      alert('Unable to save');
    }
  }

  async removeStorage(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
      alert('Unable to save');
    }
  }

  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    );
  }
}
