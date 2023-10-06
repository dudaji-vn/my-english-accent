import {
  Button,
  ChevronRightIcon,
  HStack,
  Modal,
  Text,
  VStack,
} from 'native-base';
import {COLORS, GRID} from '../../../constants/design-system';

import {Dimensions} from 'react-native';
import {HelpCircle} from 'react-native-feather';
import {IconWrapper} from '../../../components/icon-wrapper';
import {ModalCard} from '../../../components/modal-card';
import React from 'react';
import {SettingButton} from './setting-button';
import {SettingSection} from './setting-section';
import {Switch} from 'react-native-switch';
import {requestPermissions} from '../utils/request-permissions';

export const AppSetting = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isShowQuestion, setIsShowQuestion] = React.useState(false);
  const showQuestion = () => setIsShowQuestion(true);
  const hideQuestion = () => setIsShowQuestion(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const fullWidth = Dimensions.get('window').width;
  return (
    <SettingSection title="App's Setting">
      <VStack space={1}>
        <SettingButton
          onPress={() => {
            requestPermissions();
          }}
          leftElement={<ChevronRightIcon />}
          title="App's permission"
        />
        <SettingButton
          onPress={() => {}}
          leftElement={
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              circleSize={20}
              barHeight={24}
              circleBorderWidth={0}
              backgroundActive={COLORS.highlight}
              backgroundInactive={COLORS.stroke}
              circleActiveColor="white"
              circleInActiveColor="white"
              changeValueImmediately={true}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2.2}
            />
          }>
          <HStack alignItems="center" space={4}>
            <Text fontSize="md" color={COLORS.text}>
              Auto download
            </Text>

            <IconWrapper onPress={showQuestion} colorOnPress={COLORS.highlight}>
              <HelpCircle color={COLORS.text} width={20} height={20} />
            </IconWrapper>
            <Modal
              isOpen={isShowQuestion}
              onClose={hideQuestion}
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}>
              <Modal.Content width={fullWidth - GRID.gap * 2}>
                <ModalCard
                  title="Auto download"
                  confirmButton={
                    <Button
                      w="full"
                      onPress={hideQuestion}
                      ref={initialRef}
                      variant="outline">
                      I got it
                    </Button>
                  }
                  onConfirm={hideQuestion}
                  onCancel={hideQuestion}>
                  <Text fontSize="md" color={COLORS.text}>
                    When you enable “
                    <Text fontWeight="semibold">Auto download</Text>”, we will
                    automatically download every listen files you have clicked
                    play
                  </Text>
                </ModalCard>
              </Modal.Content>
            </Modal>
          </HStack>
        </SettingButton>
      </VStack>
    </SettingSection>
  );
};
