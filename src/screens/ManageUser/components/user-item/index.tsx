import { ArrowLeftIcon, CartIcon, ManageIcon } from '@/assets/icons';
import { Box, Button, FastImg, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import styles from './styles';
import dayjs from 'dayjs';
import { IUser } from '@/interfaces/auth.interfaces';
import { IRoleModalRef, RoleModal } from '../role-modal';
import { useRef } from 'react';
import { EUserRole } from '@/common';

interface IProps {
  user: IUser;
}

export const UserItem: React.FC<IProps> = ({ user }) => {
  const roleModalRef = useRef<IRoleModalRef>(null);

  const _onChangeRole = () => {
    roleModalRef.current?.onShowModal(true, user);
  };

  return (
    <Box
      direction='row'
      middle
      gap={8}
      style={styles.shadow}
      color={theme.colors.white}
      ph={8}
      pv={8}
      borderRadius={12}
    >
      <FastImg
        pictureStyle={styles.avatarImg}
        // uri={user.avatarUrl}
        uri={
          'https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-50-hinh-anh-avatar-hai-huoc-cute-va-dang-yeu-nhat_1.jpg'
        }
      />
      <Box gap={4} flex={1}>
        <TextField
          color={theme.colors.textColor}
          size={16}
          fontFamily={theme.fonts.medium}
          style={{ flexShrink: 1 }}
        >
          {user.fullName}
        </TextField>
        <TextField color={theme.colors.darkSixColor}>{`Vai trò: ${
          user.roles[0]?.name || ''
        }`}</TextField>
      </Box>
      {user.roles[0].code !== EUserRole.SUPER_ADMIN && (
        <Button borderRadius={50} color={theme.colors.lightFourColor} p={6} onPress={_onChangeRole}>
          <ManageIcon width={24} height={24} />
        </Button>
      )}
      <RoleModal ref={roleModalRef} />
    </Box>
  );
};
