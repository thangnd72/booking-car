import { RadioActiveIcon, RadioInactiveIcon } from '@/assets/icons';
import { EUserRole } from '@/common';
import { Box, Button, Modal, TextField } from '@/components';
import theme from '@/helpers/theme';
import { showError } from '@/helpers/toast';
import { IUser, IUserRole } from '@/interfaces/auth.interfaces';
import { TRootState, useAppDispatch } from '@/stores';
import { updateCustomerProfileAction } from '@/stores/client';
import { omit } from 'lodash';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
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

  const { isVisible, user } = actions;

  const dispatch = useAppDispatch();

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

  const _onChangeRole = () => {
    if (!user || !roleSelected || disableButton) {
      return;
    }
    const newUser = {
      ...user,
      roles: [omit(roleSelected, ['modified'])],
    };
    dispatch(
      updateCustomerProfileAction({
        ...newUser,
        onSuccess: () => {
          setActions(INITIAL_ACTIONS);
        },
        onError: (err) => showError(err.message),
      }),
    );
  };

  const disableButton = useMemo(() => {
    if (user?.roles[0]?.roleId === roleSelected?.roleId) {
      return true;
    }
    return false;
  }, [roleSelected, user]);

  useEffect(() => {
    if (actions.user) {
      setRoleSelected({ ...actions.user.roles[0], id: actions.user.roles[0].roleId });
    }
  }, [actions.user]);

  return (
    <Modal
      isVisible={isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
      onBackdropPress={() => setActions(INITIAL_ACTIONS)}
    >
      <Box borderRadius={24} color={theme.colors.backgroundColor} p={16} mh={16} centered>
        <TextField
          centered
          color={theme.colors.primary}
          size={21}
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
          style={disableButton ? { opacity: 0.6 } : {}}
          onPress={_onChangeRole}
        >
          <TextField color={theme.colors.backgroundColor} size={16} fontFamily={theme.fonts.medium}>
            Đồng ý
          </TextField>
        </Button>
      </Box>
    </Modal>
  );
});
