import {
  Avatar,
  Box,
  Button,
  ChevronRightIcon,
  HStack,
  Heading,
  Progress,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {QuestionOutlineIcon} from '../../../components/icons';
import {COLORS} from '../../../constants/design-system';

type Props = {};

const SettingsScreen = (props: Props) => {
  console.log(props);
  return (
    <View bgColor="white" height="full" px={4}>
      <ScrollView paddingBottom={24}>
        <VStack space={8}>
          <VStack space={4}>
            <HStack alignItems="center" space={4}>
              <Avatar bg="blue.500" style={styles.avatar} />
              <Text fontSize="md" bold>
                Nguyen Minh Nhat
              </Text>
            </HStack>
            <TouchableOpacity style={styles.btn}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize="md" color={COLORS.text}>
                  Edit Profile
                </Text>
                <ChevronRightIcon />
              </HStack>
            </TouchableOpacity>
          </VStack>
          <VStack space={4}>
            <Heading color={COLORS.text} fontSize="md">
              App's Setting
            </Heading>
            <VStack space={1}>
              <TouchableOpacity style={styles.btn}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontSize="md" color={COLORS.text}>
                    App's permission
                  </Text>
                  <ChevronRightIcon />
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" space={4}>
                    <Text fontSize="md" color={COLORS.text}>
                      Auto download
                    </Text>

                    <TouchableOpacity style={styles.questionIcon}>
                      <QuestionOutlineIcon />
                    </TouchableOpacity>
                  </HStack>
                  <ChevronRightIcon />
                </HStack>
              </TouchableOpacity>
            </VStack>
          </VStack>
          <VStack space={4}>
            <Heading color={COLORS.text} fontSize="md">
              Data and Storage
            </Heading>
            <VStack space={4}>
              <VStack space={2}>
                <Box w="100%">
                  <Progress
                    _filledTrack={{
                      bg: COLORS.highlight,
                    }}
                    bgColor={COLORS.darkerBackground}
                    value={10}
                  />
                </Box>
                <HStack justifyContent="space-between">
                  <Text fontSize="md" color={COLORS.highlight}>
                    250 Mb
                  </Text>
                  <Text fontSize="md" color={COLORS.text}>
                    256 Gb
                  </Text>
                </HStack>
              </VStack>
              <HStack justifyContent="space-between">
                <HStack alignItems="center" justifyContent="center" space={2}>
                  <View
                    width={2}
                    height={2}
                    rounded="full"
                    bgColor={COLORS.highlight}
                  />
                  <Text fontSize="md" color={COLORS.text}>
                    App usage
                  </Text>
                </HStack>
                <HStack alignItems="center" justifyContent="center" space={2}>
                  <View
                    width={2}
                    height={2}
                    rounded="full"
                    bgColor={COLORS.darkerBackground}
                  />
                  <Text fontSize="md" color={COLORS.text}>
                    Phone's disk volume
                  </Text>
                </HStack>
              </HStack>
              <TouchableOpacity style={styles.btn}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontSize="md" color={COLORS.text}>
                    Manage downloaded files
                  </Text>
                  <ChevronRightIcon />
                </HStack>
              </TouchableOpacity>
            </VStack>
          </VStack>
          <Button
            borderColor={COLORS.highlight}
            size="lg"
            variant="outline"
            rounded="md">
            <Text color={COLORS.highlight}>Log out</Text>
          </Button>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
  },
  btn: {
    backgroundColor: COLORS.darkerBackground,
    height: 56,
    borderRadius: 8,
    padding: 16,
  },
  questionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
