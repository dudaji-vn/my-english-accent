import {NavigationProp} from '@react-navigation/native';
import React from 'react';
export const useUnsavedChange = (
  isUnsaved: boolean,
  navigation: NavigationProp<any>,
  onUnsavedChange?: () => void,
) => {
  const [allowGoBack, setAllowGoBack] = React.useState(false);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!isUnsaved || allowGoBack) {
          return;
        }

        e.preventDefault();
        onUnsavedChange && onUnsavedChange();
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigation, isUnsaved, allowGoBack],
  );

  const onAllowGoBack = (callBack?: () => void) => {
    setAllowGoBack(true);
    setTimeout(() => {
      callBack ? callBack() : navigation.goBack();
    }, 100);
  };

  return {
    onAllowGoBack,
  };
};
