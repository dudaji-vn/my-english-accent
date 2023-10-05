import {
  Button,
  FormControl,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {Language, Position, User} from '../../../types/user';

import {COLORS} from '../../../constants/design-system';
import {Input} from '../../../components/form';
import KRFlag from '../../../assets/images/KoreanFlagIcon.png';
import React from 'react';
import VNFlag from '../../../assets/images/VietNamFlagIcon.png';
import devImg from '../../../assets/images/dev.png';

const FULL_NAME_MAX_LENGTH = 60;
const DISPLAY_NAME_MAX_LENGTH = 16;

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
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      fullName: user.name,
      displayName: user.displayName,
      firstLanguage: user.firstLanguage,
      position: user.position,
    },
    mode: 'onChange',
  });
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  const isValid = isDirty && Object.keys(errors).length === 0;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} bg="white" px={5}>
      <FormControl>
        <VStack space={10}>
          <Section title="Name">
            <Controller
              shouldUnregister
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required',
                },

                maxLength: {
                  value: FULL_NAME_MAX_LENGTH,
                  message: `This field must be less than ${FULL_NAME_MAX_LENGTH} characters`,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Your full name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your full name"
                  error={errors.fullName?.message}
                />
              )}
              name="fullName"
            />
            <Controller
              shouldUnregister
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required',
                },

                maxLength: {
                  value: DISPLAY_NAME_MAX_LENGTH,
                  message: `This field must be less than ${DISPLAY_NAME_MAX_LENGTH} characters`,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Your display name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your display name"
                  error={errors.displayName?.message}
                  maxLength={DISPLAY_NAME_MAX_LENGTH + 1}
                />
              )}
              name="displayName"
            />
          </Section>
          <Section title="Nationality">
            <Controller
              control={control}
              render={({field: {onChange, value: _value}}) => (
                <HStack space={5}>
                  {nationals.map(({content, value}) => (
                    <RadioCard
                      key={value}
                      isActive={_value === value}
                      content={content}
                      onPress={() => onChange(value)}
                    />
                  ))}
                </HStack>
              )}
              name="firstLanguage"
            />
          </Section>
          <Section title="Position">
            <Controller
              control={control}
              render={({field: {onChange, value: _value}}) => (
                <HStack space={5}>
                  {positions.map(({content, value}) => (
                    <RadioCard
                      key={value}
                      isActive={_value === value}
                      content={content}
                      onPress={() => onChange(value)}
                    />
                  ))}
                </HStack>
              )}
              name="position"
            />
          </Section>
          <Button
            opacity={isValid ? 1 : 0.3}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            h={14.5}
            bg={COLORS.highlight}
            rounded="lg">
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
  onPress?: () => void;
};
const RadioCard = ({isActive, content, onPress}: RadioCardProps) => {
  return (
    <Pressable flex={1} onPress={onPress}>
      <VStack opacity={isActive ? 1 : 0.6} space={2}>
        <View
          shadow={isActive ? 1 : 'none'}
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
    </Pressable>
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
