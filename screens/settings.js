import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Header,
  TouchableOpacity,
  Image,
  ScrollView,
  Picker,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CONFIG } from '../constants/index';

const YOUTUBE = CONFIG.YOUTUBE;
const STORAGE = CONFIG.STORAGE;

export default class SettingScreen extends React.Component {
  state = {
    region: '',
    regionsList: []
  };

  updateRegion = region => {
    this.setState({ region: region });
    AsyncStorage.setItem(STORAGE.CURRENT_REGION, region);
  };

  componentDidMount() {
    fetch(
      `${YOUTUBE.BASE_URL}/i18nRegions?key=${YOUTUBE.API_KEY}&part=snippet,id`
    )
      .then(res => res.json())
      .then(res => {
        const regions = [];
        res.items.forEach(item => {
          regions.push(item);
        });
        this.setState({
          regionsList: regions
        });
      });
  }

  render() {
    const items = this.state.regionsList.map((item, i) => {
      return (
        <Picker.Item
          label={item.snippet.name}
          value={item.snippet.gl}
          key={i}
        />
      );
    });
    return (
      <View>
        <Picker
          selectedValue={this.state.region}
          onValueChange={this.updateRegion}
        >
          {items}
        </Picker>
      </View>
    );
  }
}
