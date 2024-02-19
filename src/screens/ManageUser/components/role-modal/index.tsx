import { RadioActiveIcon, RadioInactiveIcon } from '@/assets/icons';
import { EUserRole } from '@/common';
import { Box, Button, Modal, TextField } from '@/components';
import theme from '@/helpers/theme';
import { IUser, IUserRole } from '@/interfaces/auth.interfaces';
import { TRootState } from '@/stores';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export interface IRoleModalRef {
  onShowModal(isVisible: boolean, user: IUser): void;
}

interface IAction {
  isVisible: boolean;
  user: IUser | undefined;
}

const INITIAL_ACTIONS: IAction = {
  isVisible: false,
  user: undefined,
};

export const RoleModal = forwardRef<IRoleModalRef>(({}, ref) => {
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const { listRole } = useSelector((state: TRootState) => state.client);
  const [roleSelected, setRoleSelected] = useState<IUserRole>();

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible, user) => {
        setActions({
          isVisible,
          user,
        });
      },
    }),
    [],
  );

  const _onSelectedRole = (role: IUserRole) => {
    setRoleSelected(role);
  };

  useEffect(() => {
    if (actions.user) {
      setRoleSelected({ ...actions.user.roles[0], id: actions.user.roles[0].roleId });
    }
  }, [actions.user]);

  console.log(roleSelected);

  return (
    <Modal
      isVisible={actions.isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
      onBackdropPress={() => setActions(INITIAL_ACTIONS)}
    >
      <Box borderRadius={24} color={theme.colors.backgroundColor} p={16} mh={16} centered>
        <TextField
          centered
          color={theme.colors.primary}
          size={2}
          mb={16}
          fontFamily={theme.fonts.medium}
        >
          Thay đổi vai trò
        </TextField>
        {listRole
          .filter((role) => role.code === EUserRole.WHOLE_SALE || role.code === EUserRole.CUSTOMER)
          .map((role) => (
            <Button
              key={role.id}
              onPress={() => _onSelectedRole(role)}
              direction='row'
              between
              color={theme.colors.lightFourColor}
              ph={16}
              pv={12}
              mb={12}
              gap={12}
              borderRadius={8}
            >
              <TextField color={theme.colors.textColor}>{role.name}</TextField>
              {roleSelected?.id === role.id ? <RadioActiveIcon /> : <RadioInactiveIcon />}
            </Button>
          ))}
        <Button
          middle
          color={theme.colors.primary}
          pv={12}
          borderRadius={8}
          mt={16}
          onPress={() => {}}
        >
          <TextField color={theme.colors.backgroundColor} size={16} fontFamily={theme.fonts.medium}>
            Đồng ý
          </TextField>
        </Button>
      </Box>
    </Modal>
  );
});
