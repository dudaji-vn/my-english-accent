import {CloseIcon, HStack, Text, VStack} from 'native-base';
import {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, View} from 'react-native';
import BreadCrumb from '../../../../components/bread-crumb/bread-crumb';
import {Input} from '../../../../components/form';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import {WordItem} from '../../../../components/word-item';
import {COLORS, OPACITY} from '../../../../constants/design-system';
import SearchResult from '../../components/SearchResult';
import {useUser} from '../../../../hooks/useUser';

const SearchListenScreen = () => {
  const {keywords, addUserKeyword, deleteUserKeyword} = useUser();
  const [textSearch, setTextSearch] = useState('');
  const renderRecentSearch = () => {
    return (
      <VStack flex={1} my={5}>
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
          data={keywords}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <WordItem
                word={item.text}
                status={'active'}
                rightElement={
                  <Pressable
                    onPress={() => {
                      console.log('test');
                      deleteUserKeyword(item._id);
                    }}>
                    <CloseIcon />
                  </Pressable>
                }
              />
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </VStack>
    );
  };

  return (
    <ScreenWrapper>
      <HStack space={2} alignItems={'center'} marginBottom={5}>
        <BreadCrumb parentTitle="Listen" mainTitle="Search" />
      </HStack>
      <Input
        autoFocus
        showSoftInputOnFocus={true}
        blurOnSubmit={false}
        onSubmitEditing={value => {
          addUserKeyword(textSearch);
        }}
        onChangeText={value => {
          setTextSearch(value);
        }}
        value={textSearch}
        marginBottom={5}
        placeholder="Search for Individuals or Groups"
      />
      {!textSearch ? (
        renderRecentSearch()
      ) : (
        <SearchResult textSearch={textSearch} />
      )}
    </ScreenWrapper>
  );
};

export default SearchListenScreen;
