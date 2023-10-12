import {Text, View} from 'native-base';
import React from 'react';
import {COLORS} from '../../constants/design-system';
import SearchNotFoundIcon from '../icons/search-notfound-icon';

const SearchNotFound = () => {
  return (
    <View alignItems={'center'}>
      <SearchNotFoundIcon />
      <Text
        marginTop={5}
        marginBottom={3}
        fontSize={20}
        fontWeight={'500'}
        color={COLORS.highlight}>
        Nothing was found
      </Text>
      <Text>There’s no result matched your keyword.</Text>
      <Text>Let’s try with another one</Text>
    </View>
  );
};

export default SearchNotFound;
