import {NavigationProp} from '@react-navigation/native';
import {HStack, Text, VStack, View} from 'native-base';
import React from 'react';

import {StyleSheet} from 'react-native';
import {Headphones} from 'react-native-feather';
import {AppProgress} from '../../../components/app-progress';
import {Filter} from '../../../components/filter';
import {MicCheckIcon, MicFilledIcon} from '../../../components/icons';
import ScrollViewLayout from '../../../components/layout/scroll-view-layout';
import {TabBar, TabDataItem} from '../../../components/tab-bar';
import {Topic, TopicCard} from '../../../components/topic-card';
import {WordItem} from '../../../components/word-item';
import {COLORS} from '../../../constants/design-system';
import {SceneMap, TabView} from 'react-native-tab-view';
import Swiper from 'react-native-deck-swiper';
import {Button} from 'react-native';

const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

type Props = {
  navigation: NavigationProp<any>;
};

const tabItems: TabDataItem[] = [
  {
    title: 'Word',
    value: 'word',
  },
  {
    title: 'Sentence',
    value: 'sentence',
  },
  {
    title: 'Both',
    value: 'both',
  },
];

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
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Word'},
    {key: 'second', title: 'Sentence'},
  ]);

  const swiperRef = React.useRef<Swiper>(null);

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={swiperRef}
          cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          renderCard={card => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{card}</Text>
              </View>
            );
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardIndex={0}
          backgroundColor={'#4FD0E9'}
          stackSize={3}
        />
        <Button
          onPress={() => {
            swiperRef.current?.swipeLeft();
          }}
          title="Press me">
          You can press me
        </Button>
      </View>
      {/* <View h={200}>
        <TabView
          renderTabBar={props => null}
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={SceneMap({
            first: () => (
              <View style={[styles.slide1, {backgroundColor: 'red'}]} />
            ),
            second: () => (
              <View style={[styles.slide2, {backgroundColor: 'blue'}]} />
            ),
          })}
        /> */}
      {/* <Swiper numOfWords={10}>
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
        </Swiper> */}
      {/* </View> */}
      {/* <ScrollViewLayout>
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
      </ScrollViewLayout> */}
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
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
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
