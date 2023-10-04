import {
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import {Language, Position, User} from '../../../types/user';

import {COLORS} from '../../../constants/design-system';
import KRFlag from '../../../assets/images/KoreanFlagIcon.png';
import React from 'react';
import VNFlag from '../../../assets/images/VietNamFlagIcon.png';
import devImg from '../../../assets/images/dev.png';

type Props = {};
const user: User = {
  avatar: 'https://i.pravatar.cc/300',
  name: 'Nguyen Minh Nhat',
  displayName: 'Sun',
  email: 'Example@gmail.com',
  firstLanguage: 'vi',
  id: '1',
  position: 'developer',
};

const SettingsProfileScreen = (props: Props) => {
  return (
    <ScrollView bg="white" px={5}>
      <FormControl>
        <VStack space={10}>
          <Section title="Name">
            <View>
              <FormControl.Label>
                <Text fontWeight="semibold">Your full name</Text>
              </FormControl.Label>

              <Input
                defaultValue={user.name}
                placeholder="Enter your full name"
              />
            </View>
            <View>
              <FormControl.Label>
                <Text fontWeight="semibold">Your display name</Text>
              </FormControl.Label>
              <Input
                defaultValue={user.displayName}
                placeholder="Enter your display name"
              />
            </View>
          </Section>
          <Section title="Nationality">
            <HStack space={5}>
              {nationals.map(({content, value}) => (
                <RadioCard
                  key={value}
                  isActive={user.firstLanguage === value}
                  content={content}
                />
              ))}
            </HStack>
          </Section>
          <Section title="Position">
            <HStack space={5}>
              {positions.map(({content, value}) => (
                <RadioCard
                  key={value}
                  isActive={user.position === value}
                  content={content}
                />
              ))}
            </HStack>
          </Section>
          <Button h={14.5} bg={COLORS.highlight} rounded="lg">
            <Text color="white">Save your changes</Text>
          </Button>
          <View />
        </VStack>
      </FormControl>
    </ScrollView>
  );
};

export default SettingsProfileScreen;

const Section = ({
  children,
  title,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <VStack space={5}>
      <Text fontWeight="semibold" fontSize="xl" color={COLORS.text}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};
type Content = {
  name: string;
  icon: React.ReactNode;
};

type RadioCardProps = {
  isActive?: boolean;
  content: Content;
};
const RadioCard = ({isActive, content}: RadioCardProps) => {
  return (
    <VStack flex={1} space={2}>
      <View
        shadow={isActive ? 1 : 0}
        opacity={isActive ? 1 : 0.5}
        borderWidth={isActive ? 1 : 0}
        borderColor={COLORS.highlight}
        justifyContent="center"
        alignItems="center"
        rounded="lg"
        bg={isActive ? 'white' : COLORS.darkerBackground}
        h={15}>
        {content.icon}
      </View>
      <Text
        fontSize="md"
        fontWeight={isActive ? 'bold' : 'normal'}
        textAlign="center"
        color={COLORS.text}>
        {content.name}
      </Text>
    </VStack>
  );
};

const nationals: {
  content: Content;
  value: Language;
}[] = [
  {
    content: {
      name: 'Korea',
      icon: <Image w={8} h={8} alt="Korean flag" source={KRFlag} />,
    },
    value: 'ko',
  },
  {
    content: {
      name: 'Vietnam',
      icon: <Image w={8} h={8} alt="Vietnamese flag" source={VNFlag} />,
    },
    value: 'vi',
  },
];

const positions: {
  content: Content;
  value: Position;
}[] = [
  {
    content: {
      name: 'Developer',
      icon: <Image w={10} h={10} alt="Developer icon" source={devImg} />,
    },
    value: 'developer',
  },
  {
    content: {
      name: 'Designer',
      icon: (
        <Image
          w={10}
          h={10}
          alt="Designer icon"
          source={require('../../../assets/images/de.png')}
        />
      ),
    },
    value: 'designer',
  },
  {
    content: {
      name: 'Others',
      icon: (
        <Image
          w={10}
          h={10}
          alt="Other icon"
          source={require('../../../assets/images/bu.png')}
        />
      ),
    },
    value: 'others',
  },
];
