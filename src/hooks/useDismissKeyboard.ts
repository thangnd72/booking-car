import { useEffect } from 'react';
import { Keyboard } from 'react-native';

export function useDismissKeyboard(isHide: boolean) {
  useEffect(() => {
    if (isHide) {
      Keyboard.dismiss();
    }
  }, [isHide]);
}
