import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {FC, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Route, SceneRendererProps, TabView} from 'react-native-tab-view';
import SearchIcon from '../../../components/icons/search-icon';
import Row from '../../../components/row';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {colors} from '../../../consts';
import CustomTabBarListen from '../components/CustomTabBarListen';
import IndividualTab from './individual/individual-tab';

import NotInternet from '../components/NotInternet';
import DownloadTab from './download/download-tab';
import FavoriteNotFound from './favorite/not-found-favorite';
import MainGroupScreen from './group/main-group-screen';

var fullWidth = Dimensions.get('window').width;

const ListenScreen: FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<any>();
  const layout = useWindowDimensions();

  const routes: Route[] = [
    {key: 'individual', title: 'Individual'},
    {key: 'group', title: 'Group'},
    {key: 'favorite', title: 'Favorite'},
    {key: 'download', title: 'Download'},
  ];

  const handleIndexChange = (selectedIndex: number) => {
    setIndex(prev => selectedIndex);
  };

  const renderScene = (props: SceneRendererProps & {route: Route}) => {
    const {route} = props;

    if (route && index !== routes.indexOf(route)) {
      return <View />;
    }
    switch (route.key) {
      case 'individual':
        return <IndividualTab /> || <NotInternet />;
      case 'group':
        return <MainGroupScreen />;
      case 'favorite':
        return true ? <FavoriteNotFound /> : <IndividualTab />;
      case 'download':
        return <DownloadTab />;
      default:
        return null;
    }
  };
  React.useEffect(() => {
    setTimeout(() => {
      setIsFocused(true);
    }, 1);
  }, []);

  return (
    <View style={[{flex: 1, backgroundColor: '#fff'}]}>
      <Row rowStyle={styles.header}>
        <Text style={styles.headerText}>Listen</Text>
        <Pressable
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
              screen: SCREEN_NAMES.searchListen,
            });
          }}>
          <SearchIcon />
        </Pressable>
      </Row>
      {isFocused && (
        <TabView
          swipeEnabled={false}
          renderTabBar={props => <CustomTabBarListen {...props} />}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={handleIndexChange}
          initialLayout={{width: layout.width, height: 0}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: fullWidth,
    height: 228,
    top: -80,
    zIndex: -1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
  },
  progress: {
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.highlight,
    paddingVertical: 4,
  },
  progressText: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.highlight,
    marginHorizontal: 14,
  },
  header: {
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.6,
    color: '#333333',
    marginTop: 16,
  },
  headerText: {
    height: 40,
    fontSize: 22,
    fontWeight: '400',
    color: COLORS.text,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight || 0,
  },
  inputText: {
    fontSize: 32,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dotted',
    marginBottom: 12,
  },
});

export default ListenScreen;
