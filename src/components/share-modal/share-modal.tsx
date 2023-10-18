import React from 'react';
import {Input} from '../form';
import {Button, FlatList, HStack, Text, VStack} from 'native-base';
import {useWindowDimensions} from 'react-native';

type Props = {};

export const ShareModal = (props: Props) => {
  const screenHeight = useWindowDimensions().height;
  const [query, setQuery] = React.useState('');
  return (
    <VStack maxHeight={(screenHeight * 2) / 3} space={5} p={5}>
      <Text>Send all files to...</Text>
      <Input
        value={query}
        onChangeText={text => setQuery(text)}
        typeInput="search"
        placeholder="Search"
      />
      <FlatList
        data={[
          {_id: '1', name: 'General'},
          {_id: '2', name: 'Developer'},
          {_id: '3', name: 'Designer'},
          {_id: '4', name: 'General'},
          {_id: '5', name: 'Developer'},
          {_id: '6', name: 'Designer'},
          {_id: '7', name: 'General'},
          {_id: '8', name: 'Developer'},
          {_id: '9', name: 'Designer'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '1', name: 'General'},
          {_id: '2', name: 'Developer'},
          {_id: '3', name: 'Designer'},
          {_id: '4', name: 'General'},
          {_id: '5', name: 'Developer'},
          {_id: '6', name: 'Designer'},
          {_id: '7', name: 'General'},
          {_id: '8', name: 'Developer'},
          {_id: '9', name: 'Designer'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
          {_id: '10', name: 'General'},
        ]}
        renderItem={({item}) => {
          return (
            <HStack>
              <Text>{item.name}</Text>
            </HStack>
          );
        }}
        keyExtractor={item => item._id}
      />
      <Button>Done</Button>
    </VStack>
  );
};
