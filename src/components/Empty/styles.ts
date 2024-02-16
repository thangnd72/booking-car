import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {scaleH, scaleW} from '@common';
import {useTheme} from '@theme';

export const useStyle = () => {
  const theme = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        noMessageTxt: {
          paddingBottom: scaleH(16),
          paddingTop: scaleH(32),
        },
        description: {
          marginHorizontal: scaleW(30),
        },
      }),
    [theme.colors.graySeven],
  );
};
