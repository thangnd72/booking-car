import { Box, Button, Modal, TextField, TextInputField } from '@/components';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { IProduct } from '@/interfaces/product.interface';
import { useAppDispatch } from '@/stores';
import { updatePlanProductAction } from '@/stores/product';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export interface IPlanModalRef {
  onShowModal(isVisible: boolean, product: IProduct): void;
}

interface IAction {
  isVisible: boolean;
  product: IProduct | undefined;
}

const INITIAL_ACTIONS: IAction = {
  isVisible: false,
  product: undefined,
};

interface IProps {
  closeSwipe: () => void;
}

export const PlanModal = forwardRef<IPlanModalRef, IProps>(({ closeSwipe }, ref) => {
  const [actions, setActions] = useState(INITIAL_ACTIONS);

  const { control, resetField, handleSubmit } = useForm<{ plan: number }>({
    defaultValues: {},
  });

  const { isVisible, product } = actions;

  const dispatch = useAppDispatch();

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible, product) => {
        setActions({
          isVisible,
          product,
        });
      },
    }),
    [],
  );

  const _updatePlan = (values: { plan: number }) => {
    if (!product) return;

    if (values.plan <= 0) {
      showError('Số lượng cập nhật phải lớn hơn 0!');
      return;
    }
    closeSwipe();
    dispatch(
      updatePlanProductAction({
        id: product?.id,
        plan: Number(values.plan),
        onSuccess: () => {
          setActions(INITIAL_ACTIONS);
          closeSwipe();
          resetField('plan');
          setTimeout(() => showSuccess('Cập nhật thành công!'), 100);
        },
        onError: (err) => showError(err.message),
      }),
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
      onBackdropPress={() => {
        setActions(INITIAL_ACTIONS);
        resetField('plan');
      }}
    >
      <Box borderRadius={24} color={theme.colors.backgroundColor} p={16} mh={16} centered>
        <TextField
          centered
          color={theme.colors.primary}
          size={21}
          mb={16}
          fontFamily={theme.fonts.medium}
        >
          Số lượng dự trù
        </TextField>

        <TextInputField
          autoFocus
          leftLabel='Số lượng'
          control={control}
          name='plan'
          keyboardType='numeric'
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập số lượng!',
            valueAsNumber: true,
          }}
        />

        <Button
          middle
          color={theme.colors.primary}
          pv={12}
          borderRadius={8}
          mt={16}
          onPress={handleSubmit(_updatePlan)}
        >
          <TextField color={theme.colors.backgroundColor} size={16} fontFamily={theme.fonts.medium}>
            Cập nhật
          </TextField>
        </Button>
      </Box>
    </Modal>
  );
});
