import { CloseIcon } from '@/assets/icons';
import { Box, Button, Modal, Spacer, TextField, TextInputField } from '@/components';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { showError } from '@/helpers/toast';
import ResponseError from '@/interfaces/error.interface';
import { ILocation, ILocationParams } from '@/interfaces/location.interface';
import { getDistrictsApi, getProvincesApi, getWardsApi } from '@/services/locations';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

export interface IReceiverModalRef {
  onShowModal(isVisible: boolean): void;
}

export const ReceiverModal = forwardRef<IReceiverModalRef>(({}, ref) => {
  const insets = useSafeAreaInsets();
  const [isVisible, setVisible] = useState<boolean>(false);

  const DEFAULT_PARAMS: ILocationParams = {
    page: 0,
    size: 70,
  };

  const [provinces, setProvinces] = useState<ILocation[]>();
  const [districts, setDistricts] = useState<ILocation[]>();
  const [wards, setWards] = useState<ILocation[]>();
  const [loadingProvince, setLoadingProvince] = useState<boolean>(false);
  const [loadingDistrict, setLoadingDistrict] = useState<boolean>(false);
  const [loadingWard, setLoadingWard] = useState<boolean>(false);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });

  const province = watch('province');
  const district = watch('district');

  useImperativeHandle(
    ref,
    () => ({
      onShowModal: (isVisible) => {
        setVisible(isVisible);
      },
    }),
    [],
  );

  const handleSave = (values: any) => {
    console.log('value', values);
  };

  const getListProvince = useCallback(async (params: ILocationParams) => {
    try {
      setLoadingProvince(true);
      const res = await getProvincesApi(params);
      setProvinces(res.data);
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    } finally {
      setLoadingProvince(false);
    }
  }, []);

  const getListDistrict = useCallback(
    async (params: ILocationParams) => {
      if (!province) {
        return;
      }
      try {
        setLoadingDistrict(true);
        const res = await getDistrictsApi({ ...params, lid: province.id });
        setDistricts(res.data);
      } catch (error) {
        const { message } = error as ResponseError;
        showError(message);
      } finally {
        setLoadingDistrict(false);
      }
    },
    [province],
  );

  const getListWard = useCallback(async (params: ILocationParams) => {
    try {
      setLoadingWard(true);
      const res = await getWardsApi(params);
      setWards(res.data);
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    } finally {
      setLoadingWard(false);
    }
  }, []);

  useEffect(() => {
    getListProvince(DEFAULT_PARAMS);
  }, []);

  useEffect(() => {
    if (!!province) {
      getListDistrict({ ...DEFAULT_PARAMS, lid: province.id });
    }
  }, [province]);

  useEffect(() => {
    if (!!district) {
      getListWard({ ...DEFAULT_PARAMS, lid: district.id });
    }
  }, [district]);

  return (
    <Modal
      isVisible={isVisible}
      entering={SlideInDown.stiffness(300)}
      exiting={SlideOutDown.stiffness(300)}
      style={styles.modalContainer}
    >
      <Box
        borderRadius={24}
        h={SIZE.HEIGHT - 100}
        pv={16}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        color={theme.colors.backgroundColor}
      >
        <Box ph={16}>
          <Box direction='row' between middle pb={24}>
            <Box w={24} />
            <TextField
              centered
              color={theme.colors.primary}
              size={21}
              fontFamily={theme.fonts.medium}
            >
              Thông tin người nhận
            </TextField>
            <Button onPress={() => setVisible(false)}>
              <CloseIcon />
            </Button>
          </Box>

          <ScrollView
            contentContainerStyle={{ paddingBottom: insets.bottom + 36 }}
            showsVerticalScrollIndicator={false}
          >
            <TextInputField
              autoFocus
              leftLabel='Họ tên'
              control={control}
              name='fullName'
              required
              rules={{
                required: 'Vui lòng nhập họ tên',
              }}
            />
            <Spacer height={12} />
            <TextInputField
              leftLabel='Số điện thoại'
              control={control}
              name='phoneNumber'
              required
              rules={{
                required: 'Vui lòng nhập số điện thoại!',
              }}
            />
            <Spacer height={12} />
            <Box>
              <TextField size={14} color={theme.colors.textColor} mb={4}>
                Tỉnh/ Thành phố
              </TextField>
              <AutocompleteDropdown
                {...register('province', { required: true })}
                closeOnBlur={false}
                useFilter={false}
                loading={loadingProvince}
                onChangeText={(text) => getListProvince({ ...DEFAULT_PARAMS, q: text })}
                trimSearchText
                inputHeight={52}
                suggestionsListMaxHeight={SIZE.HEIGHT * 0.4}
                bottomOffset={50}
                textInputProps={{
                  placeholder: 'Chọn tỉnh/ thành phố',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: {
                    borderRadius: 5,
                    backgroundColor: theme.colors.lightFourColor,
                    color: theme.colors.textColor,
                    fontSize: 14,
                    paddingLeft: 12,
                  },
                }}
                rightButtonsContainerStyle={{
                  right: 8,
                  height: 30,
                  alignSelf: 'center',
                }}
                inputContainerStyle={{
                  backgroundColor: theme.colors.lightFourColor,
                  borderRadius: 5,
                }}
                showClear={false}
                debounce={600}
                containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                onSelectItem={(item) => setValue('province', item)}
                dataSet={provinces?.map((entry) => ({ id: entry.id, title: entry.name }))}
              />
              {errors.province && (
                <TextField color={theme.colors.errorColor} size={12} pt={5}>
                  Vui lòng chọn tỉnh/ thành phố
                </TextField>
              )}
            </Box>
            <Spacer height={12} />
            <Box>
              <TextField size={14} color={theme.colors.textColor} mb={4}>
                Quận/huyện
              </TextField>
              <AutocompleteDropdown
                {...register('district', { required: true })}
                closeOnBlur={false}
                useFilter={false}
                loading={loadingDistrict}
                trimSearchText
                inputHeight={52}
                suggestionsListMaxHeight={SIZE.HEIGHT * 0.4}
                textInputProps={{
                  placeholder: 'Chọn quận/ huyện',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: {
                    borderRadius: 5,
                    backgroundColor: theme.colors.lightFourColor,
                    color: theme.colors.textColor,
                    fontSize: 14,
                    paddingLeft: 12,
                  },
                }}
                rightButtonsContainerStyle={{
                  right: 8,
                  height: 30,
                  alignSelf: 'center',
                }}
                inputContainerStyle={{
                  backgroundColor: theme.colors.lightFourColor,
                  borderRadius: 5,
                }}
                showClear={false}
                debounce={600}
                containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                onSelectItem={(item) => setValue('district', item)}
                dataSet={districts?.map((entry) => ({ id: entry.id, title: entry.name }))}
              />
              {errors.district && (
                <TextField color={theme.colors.errorColor} size={12} pt={5}>
                  Vui lòng chọn quận/ huyện
                </TextField>
              )}
            </Box>
            <Spacer height={12} />
            <Box>
              <TextField size={14} color={theme.colors.textColor} mb={4}>
                Phường/ Xã
              </TextField>
              <AutocompleteDropdown
                {...register('ward', { required: true })}
                closeOnBlur={false}
                useFilter={false}
                loading={loadingWard}
                onChangeText={(text) => getListWard({ ...DEFAULT_PARAMS, q: text })}
                trimSearchText
                inputHeight={52}
                suggestionsListMaxHeight={SIZE.HEIGHT * 0.4}
                textInputProps={{
                  placeholder: 'Chọn phường/ xã',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: {
                    borderRadius: 5,
                    backgroundColor: theme.colors.lightFourColor,
                    color: theme.colors.textColor,
                    fontSize: 14,
                    paddingLeft: 12,
                  },
                }}
                rightButtonsContainerStyle={{
                  right: 8,
                  height: 30,
                  alignSelf: 'center',
                }}
                inputContainerStyle={{
                  backgroundColor: theme.colors.lightFourColor,
                  borderRadius: 5,
                }}
                showClear={false}
                debounce={600}
                containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                onSelectItem={(item) => setValue('ward', item)}
                dataSet={wards?.map((entry) => ({ id: entry.id, title: entry.name }))}
              />
              {errors.ward && (
                <TextField color={theme.colors.errorColor} size={12} pt={5}>
                  Vui lòng chọn phường/ xã
                </TextField>
              )}
            </Box>
            <Spacer height={12} />
            <TextInputField
              leftLabel='Địa chỉ cụ thể'
              control={control}
              name='phoneNumber'
              required
              rules={{
                required: 'Vui lòng nhập địa chỉ!',
              }}
            />
            <Button
              middle
              centered
              color={theme.colors.primary}
              pv={16}
              borderRadius={12}
              mt={24}
              onPress={handleSubmit(handleSave)}
            >
              <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
                Đồng ý
              </TextField>
            </Button>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
});
