import {NavigationProp} from '@react-navigation/native';
import {HStack, Text, VStack, View} from 'native-base';
import React from 'react';

import ScrollViewLayout from '../../../components/layout/scroll-view-layout';
import {Topic, TopicCard} from '../../../components/topic-card';
import {COLORS} from '../../../constants/design-system';
import {WordItem} from '../../../components/word-item';
import {MicCheckIcon, MicFilledIcon} from '../../../components/icons';
import {Filter} from '../../../components/filter';
import {AppProgress} from '../../../components/app-progress';
import {Headphones} from 'react-native-feather';
import {Swiper} from '../../../components/swiper/swiper';
import {StyleSheet} from 'react-native';

const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

type Props = {
  navigation: NavigationProp<any>;
};

const data: Topic[] = [
  {
    name: 'General',
    image: generalImg,
    description: 'General description',
    totalWords: 100,
    numOfAchieved: 10,
  },
  {
    name: 'Developer',
    image: designerImg,
    description: 'General description',
    totalWords: 1,
    numOfAchieved: 0,
  },
];
const words: {
  text: string;
  isRecorded: boolean;
}[] = [
  {
    text: 'Hello',
    isRecorded: false,
  },
  {
    text: 'Hi',
    isRecorded: true,
  },
];

const ExampleComponentsScreen = ({}: Props) => {
  return (
    <>
      <View h={200}>
        <Swiper numOfWords={10}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
        </Swiper>
      </View>
      <ScrollViewLayout>
        <VStack space={10}>
          <Section title="Topic Card">
            <HStack space={4} justifyContent="space-between">
              {data.map((topic, index) => (
                <TopicCard isActive={index === 0} key={index} topic={topic} />
              ))}
            </HStack>
          </Section>
          <Section title="Word Item">
            <VStack space={4} justifyContent="space-between">
              {words.map((topic, index) => (
                <WordItem
                  key={index}
                  word={topic.text}
                  status={topic.isRecorded ? 'disabled' : 'active'}
                  leftElement={
                    topic.isRecorded ? (
                      <MicCheckIcon />
                    ) : (
                      <MicFilledIcon opacity={0.1} color={COLORS.text} />
                    )
                  }
                />
              ))}
            </VStack>
          </Section>
          <Section title="Filter">
            <Filter
              onSelected={value => console.log(value)}
              filterItems={[
                {
                  label: 'All',
                  value: 'all',
                },
                {
                  label: 'Recorded',
                  value: 'recorded',
                },
                {
                  label: 'Not recorded',
                  value: 'not-recorded',
                },
              ]}
            />
          </Section>
          <Section title="App Progress">
            <AppProgress
              progress={40}
              startIcon={<Headphones color="white" width={20} height={20} />}
            />
          </Section>
        </VStack>
      </ScrollViewLayout>
    </>
  );
};

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const Section = ({title, children}: {title: string; children: any}) => {
  return (
    <VStack space={2}>
      <Text bold color={COLORS.text}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};

export default ExampleComponentsScreen;
