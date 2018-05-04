import React from 'react';
import { StyleSheet, WebView, Navigator } from 'react-native';

export default class VideoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`
    };
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView
        source={{ uri: `https://www.youtube.com/watch?v=${params.youtubeId}` }}
      />
    );
  }
}
