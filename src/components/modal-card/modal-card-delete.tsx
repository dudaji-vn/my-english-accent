import React from 'react';
import {ModalCard} from './modal-card';
import {Button} from 'native-base';
import {COLORS} from '../../constants/design-system';

type Props = {
  title: string;
  description?: string;
  cancelText?: string;
  deleteText?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export const ModalCardDelete = ({
  title,
  description,
  cancelText = 'Cancel',
  deleteText = 'Delete',
  isLoading = false,
  onCancel,
  onDelete,
}: Props) => {
  return (
    <ModalCard
      title={title}
      description={description}
      cancelButton={
        <Button
          _text={{
            color: COLORS.error,
          }}
          _pressed={{
            borderColor: COLORS.errorClick,
            _text: {
              color: COLORS.errorClick,
            },
          }}
          borderColor={COLORS.error}
          onPress={onCancel}
          variant="outline">
          {cancelText}
        </Button>
      }
      confirmButton={
        <Button
          isLoading={isLoading}
          _pressed={{
            bg: COLORS.errorClick,
          }}
          bg={COLORS.error}
          onPress={onDelete}>
          {deleteText}
        </Button>
      }
    />
  );
};
