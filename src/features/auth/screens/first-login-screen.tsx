import * as React from 'react';
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {Route, SceneRendererProps, TabView} from 'react-native-tab-view';
import AppButton from '../../../components/app-button';
import CountryCard from '../../../components/country-card';
import CustomCard from '../../../components/custom-card';
import CustomTabBar from '../../../components/custom-library/CustomTabBar';
import Row from '../../../components/row';
import {colors, keyStorage} from '../../../consts';
import {IUserRegisterDTO} from '../../../interfaces/api/Auth';
import {useRootSelector} from '../../../redux/reducers';
import {authService} from '../../../services/auth.service';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setIsAuthenticate} from '../../../redux/reducers/user.reducer';
import commonStyles from '../../../styles/common';
import CreateUserLoading from './create-user-loading';
interface IRouteProps {
  jumpTo: (key: string) => void;
  userData: IUserRegisterDTO;
  setUserData: Dispatch<SetStateAction<IUserRegisterDTO>>;
}
const FirstRoute = (props: IRouteProps) => {
  const {jumpTo, userData, setUserData} = props;

  return (
    <View style={[styles.container]}>
      <Text style={[commonStyles.marginBottom32, commonStyles.textNormal]}>
        Hi, your
        <Text style={commonStyles.textHightLight}> full name</Text> is
      </Text>
      <View style={[commonStyles.marginBottom60, {marginTop: 60}]}>
        <TextInput
          placeholderTextColor={colors.stroke}
          onChangeText={value => {
            setUserData(prev => {
              return {
                ...prev,
                fullName: value,
              };
            });
          }}
          value={userData.fullName}
          placeholder="ex: Jonas Brothers"
          style={styles.inputText}
        />
      </View>

      <AppButton
        title="Next step"
        type="highlight"
        disabled={!userData.fullName}
        onPress={() => {
          jumpTo('second');
        }}
        fullWidth
        buttonStyle={[commonStyles.marginTop160]}
      />
    </View>
  );
};

const SecondRoute = (props: IRouteProps) => {
  const {jumpTo, userData, setUserData} = props;
  return (
    <View style={[styles.container]}>
      <Text
        style={[
          commonStyles.marginBottom32,
          commonStyles.textNormal,
          commonStyles.textCenter,
          commonStyles.paddingHorizontal20,
        ]}>
        How’s about your
        <Text style={commonStyles.textHightLight}> nick name</Text> ?
      </Text>

      <View>
        <TextInput
          placeholderTextColor={colors.stroke}
          maxLength={16}
          value={userData.displayName}
          onChangeText={value => {
            setUserData(prev => {
              return {
                ...prev,
                displayName: value,
              };
            });
          }}
          placeholder="ex: Jonas Brothers"
          style={styles.inputText}
        />
        <Text style={commonStyles.textNote}>(Limit 16 characters)</Text>
      </View>
      <Row rowStyle={[{gap: 16, marginTop: 214}]}>
        <AppButton
          onPress={() => jumpTo('first')}
          type="transparent"
          title="Back"
        />
        <AppButton
          disabled={!userData.displayName}
          onPress={() => jumpTo('third')}
          type="highlight"
          title="Next"
        />
      </Row>
    </View>
  );
};

const ThirdRoute = (props: IRouteProps) => {
  const {jumpTo, userData, setUserData} = props;
  return (
    <View style={[styles.container]}>
      <Text
        style={[
          commonStyles.marginBottom32,
          commonStyles.textNormal,
          commonStyles.textCenter,
        ]}>
        Where’re you
        <Text style={commonStyles.textHightLight}> come from</Text> ?
      </Text>
      <View
        style={[
          {
            gap: 12,
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 120,
          },
        ]}>
        <CountryCard
          isActive={userData.nativeLanguage === 'Korea'}
          onPress={() => {
            setUserData(prev => {
              return {
                ...prev,
                nativeLanguage: 'Korea',
              };
            });
          }}
          country="Korea"
          source={require('../../../assets/images/KoreanFlagIcon.png')}
        />
        <CountryCard
          isActive={userData.nativeLanguage === 'VietNam'}
          onPress={() => {
            setUserData(prev => {
              return {
                ...prev,
                nativeLanguage: 'VietNam',
              };
            });
          }}
          country="VietNam"
          source={require('../../../assets/images/VietNamFlagIcon.png')}
        />
      </View>
      <Row rowStyle={{gap: 10}}>
        <AppButton
          onPress={() => jumpTo('second')}
          type="transparent"
          title="Back"
        />
        <AppButton
          disabled={!userData.nativeLanguage}
          onPress={() => jumpTo('four')}
          type="highlight"
          title="Next"
        />
      </Row>
    </View>
  );
};
const FourRoute = (props: IRouteProps) => {
  const {jumpTo, userData, setUserData} = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const allRoles = [
    {
      title: 'Developer',
      image: require('../../../assets/images/Dev.png'),
    },
    {
      title: 'Designer',
      image: require('../../../assets/images/Designer.png'),
    },
    {
      title: 'Others',
      image: require('../../../assets/images/Other.png'),
    },
  ];
  return !isLoading ? (
    <View style={[styles.container]}>
      <Text style={[commonStyles.marginBottom32, commonStyles.textNormal]}>
        Your
        <Text style={commonStyles.textHightLight}> current role</Text> is ?
      </Text>

      <Row rowStyle={[{gap: 10, marginBottom: 170, flexDirection: 'row'}]}>
        {allRoles.map((item, index) => {
          return (
            <CustomCard
              isActive={userData.role === allRoles[index].title}
              containerStyle={[
                userData.role === allRoles[index].title && {opacity: 1},
                {flex: 1, opacity: 0.6},
              ]}
              onPress={() => {
                setUserData(prev => {
                  return {
                    ...prev,
                    role: allRoles[index].title,
                  };
                });
              }}
              key={index}
              source={item.image}
              title={item.title}
            />
          );
        })}
      </Row>

      <Row rowStyle={{gap: 16}}>
        <AppButton
          onPress={() => jumpTo('third')}
          type="transparent"
          title="Back"
        />
        <AppButton
          disabled={!userData.role}
          onPress={() => {
            if (userData) {
              setIsLoading(true);
              authService
                .register(userData)
                .then(token => {
                  AsyncStorage.setItem(keyStorage.accessToken, token);
                  dispatch(setIsAuthenticate(true));
                })
                .catch(err => {
                  console.log(err.message);
                  console.log(err?.response.data);
                });
            }
          }}
          type="highlight"
          title="Save"
        />
      </Row>
    </View>
  ) : (
    <CreateUserLoading />
  );
};

const FirstLoginScreen: FC = () => {
  const [index, setIndex] = useState(0);
  const user = useRootSelector(x => x.user);
  const [userData, setUserData] = useState<IUserRegisterDTO>({
    userId: '',
    avatar: '',
    email: '',
    displayName: '',
    fullName: '',
    nativeLanguage: '',
    role: '',
  });
  useEffect(() => {
    if (user?.email) {
      setUserData(prev => {
        return {
          ...prev,
          email: user.email,
          avatar: user.avatar,
          userId: user.userId,
        };
      });
    }
  }, [user]);

  const routes = [
    {key: 'first', title: ''},
    {key: 'second', title: ''},
    {key: 'third', title: ''},
    {key: 'four', title: ''},
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
        return (
          <FirstRoute
            userData={userData}
            setUserData={setUserData}
            jumpTo={jumpTo}
          />
        );
      case 'second':
        return (
          <SecondRoute
            userData={userData}
            setUserData={setUserData}
            jumpTo={jumpTo}
          />
        );
      case 'third':
        return (
          <ThirdRoute
            userData={userData}
            setUserData={setUserData}
            jumpTo={jumpTo}
          />
        );
      case 'four':
        return (
          <FourRoute
            userData={userData}
            setUserData={setUserData}
            jumpTo={jumpTo}
          />
        );
    }
  };
  return (
    <View style={[{flex: 1}]}>
      <Row rowStyle={styles.header}>
        <Text style={styles.headerText}>Let’s get start</Text>
        <View style={styles.progress}>
          <Text style={styles.progressText}>{`${index + 1}/4`}</Text>
        </View>
      </Row>
      <TabView
        swipeEnabled={false}
        renderTabBar={props => <CustomTabBar {...props} />}
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
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.6,
    color: '#333333',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '400',
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

export default FirstLoginScreen;
