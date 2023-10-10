import {Modal as NBModal, IModalProps} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {GRID} from '../../constants/design-system';
const fullWidth = Dimensions.get('window').width;
type Props = IModalProps & {
  children: React.ReactNode;
};
export const Modal = (props: Props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <NBModal initialFocusRef={initialRef} finalFocusRef={finalRef} {...props}>
      <NBModal.Content width={fullWidth - GRID.gap * 2}>
        {props.children}
      </NBModal.Content>
    </NBModal>
  );
};
