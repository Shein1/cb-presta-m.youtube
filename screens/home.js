import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Navigator,
  AsyncStorage
} from 'react-native';
import { CONFIG } from '../constants/index.js';
import { Icon } from 'react-native-elements';
import TextLimit from '../components/text_limit.js';

const STORAGE = CONFIG.STORAGE;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      region: '',
      isSearchTerms: false,
      search: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerLeft: (
        <TouchableOpacity>
          <Image
            source={require('../assets/logo2.png')}
            style={{ height: 50, width: 75, marginLeft: 20 }}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 20 }}>
          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            <Icon
              name="search"
              size={25}
              color={'#fff'}
              onPress={() => state.params.search()}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            <Icon name="cached" size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            <Icon name="favorite" size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => navigation.navigate('Setting')}
          >
            <Icon name="settings" size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount() {
    const { BASE_URL, API_KEY } = CONFIG.YOUTUBE;
    const region = `&regionCode=${this.state.region}`;
    console.log(region, 'region');
    const qp = '&part=snippet,id&order=rating';
    return fetch(
      `${BASE_URL}/search/?key=${API_KEY}&${qp}&&maxResults=${
        CONFIG.YOUTUBE.DEFAULT_NB_RESULT
      }&regionCode=US`
    )
      .then(res => res.json())
      .then(resJson => {
        const videos = [];

        resJson.items.forEach(v => {
          videos.push(v);
        });

        this.setState({
          videos: videos
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.props.navigation.setParams({
      search: this._search
    });
  }

  _search = () => {
    if (this.state.isSearchTerms) {
      this.setState({ isSearchTerms: false });
    } else {
      this.setState({ isSearchTerms: true });
    }
  };

  componentWillMount() {
    try {
      AsyncStorage.getItem(STORAGE.CURRENT_REGION).then(result => {
        this.setState({
          region: result
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const list = this._items();
    return (
      <View style={styles.container}>
        {this._toggleSearch()}
        <ScrollView>
          <View style={styles.body}>
            <Text style={styles.title}>Trending Video</Text>
            {list}
          </View>
        </ScrollView>
      </View>
    );
  }

  _items = () => {
    const { navigate } = this.props.navigation;
    const list = this.state.videos.map((item, i) => {
      return (
        <TouchableOpacity
          key={item.id.videoId}
          onPress={() =>
            navigate('Video', {
              youtubeId: item.id.videoId,
              title: item.snippet.title
            })
          }
        >
          <View style={styles.videos}>
            <Image
              source={{ uri: item.snippet.thumbnails.medium.url }}
              style={{ width: 320, height: 180 }}
            />
            <Text style={styles.videosItem}>{item.snippet.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });
    return list;
  };

  _searchButton = () => {
    console.log(this.state.search);
    fetch(
      `${CONFIG.YOUTUBE.BASE_URL}/search/?key=${
        CONFIG.YOUTUBE.API_KEY
      }&part=snippet,id&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}&q=${
        this.state.search
      }`
    )
      .then(res => res.json())
      .then(res => {
        const video = [];
        res.items.forEach(item => {
          video.push(item);
        });
        this.setState({
          video: video
        });
      })
      .catch(error => {
        console.error(error);
      });
    console.log(this.state.search);
  };

  _toggleSearch() {
    if (this.state.isSearchTerms) {
      return (
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={search => this.setState({ search })}
          value={this.state.text}
          onEndEditing={() => this._searchButton()}
          placeholder="Search"
        />
      );
    }
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  navBar: {
    height: 65,
    backgroundColor: '#F11630',
    elevation: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: width
  },
  logo: {
    width: 100,
    height: 30
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videos: {
    paddingTop: 15,
    backgroundColor: 'white',
    width: width,
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videosItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  },
  text: {
    color: '#fff',
    padding: 20,
    borderEndColor: '#000'
  },
  title: {
    height: 40,
    backgroundColor: 'black',
    color: '#fff',
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
