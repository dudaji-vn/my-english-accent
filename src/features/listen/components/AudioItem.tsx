import {HStack, Image, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import SpeakerIconRound from '../../../components/icons/speaker-icon-round';
import UserAvatar from '../../../components/user-avatar';
import {VNFlag} from '../../../configs';
import {COLORS, OPACITY} from '../../../constants/design-system';

const AudioItem = () => {
  const WordAudio = () => {
    return (
      <View style={styles.container} shadow={'e3'}>
        <View p={4} bg={COLORS.darkerBackground} mb={5}>
          <Text fontWeight={'700'} fontSize={32} color={COLORS.highlight}>
            User Interface (UI)
          </Text>
          <Text opacity={OPACITY.low} mb={3}>
            /ˈyo͞ozər ˈin(t)ərˌfās/
          </Text>
          <HStack space={2}>
            <Image w={6} h={6} source={VNFlag} alt="" />
            <Text opacity={OPACITY.normal}>Giao diện người dùng</Text>
          </HStack>
        </View>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack space={2} alignItems={'center'}>
            <UserAvatar flagWidth={2} width={6} height={6} nation={'ko'} />
            <Text>Display name</Text>
          </HStack>

          <SpeakerIconRound />
        </HStack>
      </View>
    );
  };
  const SentencesAudio = () => {
    return (
      <View style={styles.container} shadow={'e3'}>
        <View p={4} bg={COLORS.darkerBackground} mb={5}>
          <Text fontSize={20}>
            The <Text color={COLORS.highlight}>user interface</Text> of the app
            is too complicated
          </Text>

          <HStack alignItems={'center'} space={2}>
            <Image w={6} h={6} source={VNFlag} alt="" />
            <Text paddingRight={6} opacity={OPACITY.normal}>
              Giao diện người dùng của ứng dụng quá phức tạp
            </Text>
          </HStack>
        </View>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack space={2} alignItems={'center'}>
            <UserAvatar flagWidth={2} width={6} height={6} nation={'ko'} />
            <Text>Display name</Text>
          </HStack>
          <SpeakerIconRound />
        </HStack>
      </View>
    );
  };
  return (
    <View>
      <View mb={10}>
        <WordAudio />
      </View>
      <View mb={10}>
        <SentencesAudio />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 20,
    backgroundColor: COLORS.lighterBackground,
  },
});
export default AudioItem;
