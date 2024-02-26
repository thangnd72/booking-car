import { ArrowLeftIcon, LogoApp, SyncWhiteIcon } from '@/assets/icons';
import { Box, Button, Spacer, TextField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import ResponseError from '@/interfaces/error.interface';
import { syncCustomerApi } from '@/services/kiotviet.services';
import { useAppDispatch } from '@/stores';
import { setGlobalLoading } from '@/stores/client';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SynchronizedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const syncCustomer = async () => {
    try {
      dispatch(setGlobalLoading(true));
      await syncCustomerApi();
      showSuccess('Đồng bộ người dùng thành công!');
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  const syncCategories = async () => {
    try {
      dispatch(setGlobalLoading(true));
      await syncCustomerApi();
      showSuccess('Đồng bộ danh mục thành công!');
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  const syncProducts = async () => {
    try {
      dispatch(setGlobalLoading(true));
      await syncCustomerApi();
      showSuccess('Đồng bộ sản phẩm thành công!');
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };

  return (
    <Box flex={1} ph={16} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box direction='row' middle gap={8} between>
        <Button onPress={goBack}>
          <ArrowLeftIcon />
        </Button>
        <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
          Đồng bộ dữ liệu
        </TextField>
        <Box w={24} />
      </Box>

      <Box mt={36}>
        <Box middle mb={24}>
          <LogoApp width={120} height={120} />
        </Box>
        <Button
          onPress={syncCustomer}
          h={52}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={8}
          direction='row'
          gap={8}
        >
          <SyncWhiteIcon width={24} height={24} />
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Đồng bộ người dùng
          </TextField>
        </Button>
        <Spacer height={8} />
        <Button
          onPress={syncCategories}
          h={52}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={8}
          direction='row'
          gap={8}
        >
          <SyncWhiteIcon width={24} height={24} />
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Đồng bộ danh mục
          </TextField>
        </Button>
        <Spacer height={8} />
        <Button
          onPress={syncProducts}
          h={52}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={8}
          direction='row'
          gap={8}
        >
          <SyncWhiteIcon width={24} height={24} />
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Đồng bộ sản phẩm
          </TextField>
        </Button>
      </Box>
    </Box>
  );
};
export default SynchronizedScreen;
