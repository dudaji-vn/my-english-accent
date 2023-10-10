import * as React from 'react';
import {FC, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Route, SceneRendererProps, TabView} from 'react-native-tab-view';
import SearchIcon from '../../../components/icons/search-icon';
import Row from '../../../components/row';
import {COLORS} from '../../../constants/design-system';
import {colors} from '../../../consts';
import CustomTabBarListen from '../components/CustomTabBarListen';
import IndividualTab from './individual/individual-tab';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants/screen';
import {IndividualNavigator} from './individual/individual-navigator';

var fullWidth = Dimensions.get('window').width;

const ListenScreen: FC = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<any>();

  const routes = [
    {key: 'first', title: 'Individual'},
    {key: 'second', title: 'Group'},
    {key: 'third', title: 'Favorite'},
    {key: 'four', title: 'Download'},
  ];

  const handleIndexChange = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const renderScene = <T extends Route>(
    props: SceneRendererProps & {route: T},
  ) => {
    const {route, jumpTo} = props;
    switch (route.key) {
      case 'first':
        return <IndividualNavigator />;
      case 'second':
        return <IndividualTab />;
      case 'third':
        return <IndividualTab />;
      case 'four':
        return <IndividualTab />;
    }
  };
  return (
    <View style={[{flex: 1}]}>
      <Row rowStyle={styles.header}>
        <Text style={styles.headerText}>Listen</Text>
        <Pressable
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.searchListen);
          }}>
          <SearchIcon />
        </Pressable>
      </Row>
      <TabView
        renderTabBar={props => <CustomTabBarListen {...props} />}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
      />
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
