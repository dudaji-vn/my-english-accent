import {useState} from 'react';
import {COLORS} from '../constants/design-system';

export const usePrimaryClick = (defaultColor: string) => {
  const [color, setColor] = useState(defaultColor);
  const handlePressIn = () => setColor(COLORS.highlight);
  const handlePressOut = () => setColor(defaultColor);
  return {color, handlePressIn, handlePressOut};
};
