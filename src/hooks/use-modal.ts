import {useRef, useState} from 'react';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  function close() {
    setIsShowing(false);
  }

  function open() {
    setIsShowing(true);
  }
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return {
    isShowing,
    toggle,
    close,
    open,
    initialRef,
    finalRef,
  };
};
