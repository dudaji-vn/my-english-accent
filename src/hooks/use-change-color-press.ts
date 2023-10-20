import {useState} from 'react';

export const useChangeColorPress = (
  defaultColor: string,
  colorChange: string,
) => {
  const [color, setColor] = useState(defaultColor);
  const handlePressIn = () => setColor(colorChange);
  const handlePressOut = () => setColor(defaultColor);
  return {color, handlePressIn, handlePressOut};
};
