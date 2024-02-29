import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: SIZE.scaleH(6),
    marginVertical: 1,
  },

  partnerContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
  },

  partnerMessageWithoutAvt: {
    marginLeft: SIZE.scaleW(38),
  },

  myMessage: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginTop: SIZE.scaleH(12),
  },

  colorMyMessage: {
    backgroundColor: theme.colors.primary,
  },

  partnerMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },

  colorPartnerMessage: {
    backgroundColor: theme.colors.lightSixColor,
  },

  content: {
    borderRadius: SIZE.scaleH(7),
  },

  text: {
    color: theme.colors.textColor,
    paddingVertical: SIZE.scaleH(7),
    paddingHorizontal: SIZE.scaleW(16),
  },

  txtMyMessage: {
    color: theme.colors.backgroundColor,
  },

  avatar: {
    width: SIZE.scaleW(26),
    height: SIZE.scaleW(26),
    borderRadius: SIZE.scaleW(26),
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    resizeMode: 'stretch',
  },
});

export default styles;
