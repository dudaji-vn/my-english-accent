import {Button} from 'native-base';
import * as React from 'react';
import {FC, useState} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import CountryCard from '../../../components/country-card';
import {colors} from '../../../consts';
import commonStyles from '../../../styles/common';
import AppButton from '../../../components/app-button';

const FirstRoute = () => (
  <View style={[styles.container]}>
    <Text style={{marginTop: 60, fontSize: 32}}>Hi, your full name is</Text>

    <View style={{marginTop: 60}}>
      <TextInput placeholder="ex: Jonas Brothers" style={styles.inputText} />
    </View>

    <Button style={styles.button} flexDirection={'row'} bg="highlight">
      <Text style={{color: '#fff'}}>Next step</Text>
    </Button>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.container]}>
    <Text style={{marginTop: 60, fontSize: 32}}>
      How’s about your nick name?
    </Text>

    <View style={{marginTop: 60}}>
      <TextInput placeholder="ex: Jonas Brothers" style={styles.inputText} />
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        justifyContent: 'center',
      }}>
      <AppButton
        type="transparent"
        title="Back"
        buttonStyle={{
          width: '40%',
          borderWidth: 1,
          borderColor: colors.primary,
        }}
      />

      <AppButton
        type="highlight"
        title="Save"
        buttonStyle={{width: '40%', borderColor: colors.primary}}
      />
    </View>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.container]}>
    <Text style={[commonStyles.marginBottom32, commonStyles.textNormal]}>
      Where’s you
      <Text style={commonStyles.textHightLight}> come from</Text> ?
    </Text>

    <View
      style={{
        gap: 12,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <CountryCard
        country="Korea"
        source={require('../../../assets/images/KoreanFlagIcon.png')}
      />
      <CountryCard
        country="VietNam"
        source={require('../../../assets/images/VietNamFlagIcon.png')}
      />
    </View>
  </View>
);
const FourRoute = () => (
  <View style={[styles.container]}>
    <Text>Your current role is?</Text>
  </View>
);
const FirstLoginScreen: FC = () => {
  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'first', title: ''},
    {key: 'second', title: ''},
    {key: 'third', title: ''},
    {key: 'four', title: ''},
  ];

  const handleIndexChange = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: colors.highlight}}
        style={{backgroundColor: 'white'}}
      />
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    four: FourRoute,
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Let’s get start</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 60,
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    opacity: 0.6,
    color: '#333333',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight || 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: `${25}%`,
    backgroundColor: 'blue',
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 60,
  },
  inputText: {
    fontSize: 32,
  },
});

export default FirstLoginScreen;
