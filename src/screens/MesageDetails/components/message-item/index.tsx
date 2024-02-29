import { Box, FastImg, TextField } from '@/components';
import theme from '@/helpers/theme';
import { IUser } from '@/interfaces/auth.interfaces';
import { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';

interface IProps {
  data: any;
  showAvt: boolean;
  profile: IUser;
}

export const MessageItem = ({ data, profile, showAvt }: IProps) => {
  const { content, createdAt, author, id } = data;
  const isMyMessage = author?.id === profile?.id;

  console.log('profile', profile.id);
  const floatStyle = isMyMessage ? styles.myMessage : styles.partnerMessage;
  const colorStyle = isMyMessage ? styles.colorMyMessage : styles.colorPartnerMessage;
  const [sizeImage, setSizeImage] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  return (
    <Box ph={20}>
      {createdAt && (
        <TextField size={10} mh={16} centered color={theme.colors.lightThreeColor}>
          {'2 gio truoc'}
        </TextField>
      )}
      <View style={[styles.container, !isMyMessage ? styles.partnerContainer : {}]}>
        {!isMyMessage && (
          <>
            {showAvt ? (
              <FastImg
                pictureStyle={styles.avatar}
                uri={
                  'https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-50-hinh-anh-avatar-hai-huoc-cute-va-dang-yeu-nhat_1.jpg'
                }
              />
            ) : (
              <Box w={26} />
            )}
          </>
        )}
        <View style={isMyMessage ? styles.partnerMessageWithoutAvt : {}}>
          {content && (
            <View style={[styles.content, floatStyle, colorStyle]}>
              <TextField style={[styles.text, isMyMessage && styles.txtMyMessage]}>
                {content}
              </TextField>
            </View>
          )}
        </View>
      </View>
    </Box>
  );
};
