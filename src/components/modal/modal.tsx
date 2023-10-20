import {Modal as NBModal, IModalProps, ToastProvider} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {GRID} from '../../constants/design-system';
const fullWidth = Dimensions.get('window').width;
type Props = IModalProps & {
  children: React.ReactNode;
  isTransparent?: boolean;
};
export const Modal = (props: Props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <NBModal
      safeAreaBottom
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      {...props}>
      <ToastProvider>
        <NBModal.Content
          style={{
            backgroundColor: props.isTransparent ? 'transparent' : 'white',
          }}
          width={fullWidth - GRID.gap * 2}>
          {props.children}
        </NBModal.Content>
      </ToastProvider>
    </NBModal>
  );
};
