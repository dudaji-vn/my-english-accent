import {CloseIcon, HStack, Text} from 'native-base';
import BreadCrumb from '../../../../components/bread-crumb/bread-crumb';
import {Input} from '../../../../components/form';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import {FlatList, Pressable, SafeAreaView, View} from 'react-native';
import {COLORS, OPACITY} from '../../../../constants/design-system';
import {WordItem} from '../../../../components/word-item';
import {useState} from 'react';
import SearchResult from '../../components/SearchResult';

const SearchListenScreen = () => {
  const words = [
    'Keyword1',
    'Keyword2',
    'Keyword3',
    'Keyword4',
    'Keyword5',
    'Keyword6',
    'Keyword7',
    'Keyword8',
    'Keyword9',
    'Keyword10',
    'Keyword11',
  ];
  const [textSearch, setTextSearch] = useState('');
  const renderRecentSearch = () => {
    return (
      <SafeAreaView>
        <HStack justifyContent={'space-between'} alignItems={'center'} mb={5}>
          <Text style={{color: COLORS.highlight}}>Recent Search</Text>
          <Pressable>
            <Text style={{opacity: OPACITY.normal}}>Clear all</Text>
          </Pressable>
        </HStack>
        <FlatList
          numColumns={1}
          horizontal={false}
          nestedScrollEnabled={true}
          data={words}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <WordItem
                word={item}
                status={'active'}
                leftElement={<CloseIcon />}
              />
            </View>
          )}
          keyExtractor={item => item}
        />
      </SafeAreaView>
    );
  };
  const renderResult = () => {
    return <Text>Result</Text>;
  };
  return (
    <ScreenWrapper>
      <HStack space={2} alignItems={'center'} marginBottom={5}>
        <BreadCrumb parentTitle="Listen" mainTitle="Search" />
      </HStack>
      <Input
        onChangeText={value => {
          setTextSearch(value);
        }}
        value={textSearch}
        marginBottom={5}
        placeholder="Search for Individuals or Groups"
      />
      {!textSearch ? renderRecentSearch() : <SearchResult />}
    </ScreenWrapper>
  );
};

export default SearchListenScreen;
