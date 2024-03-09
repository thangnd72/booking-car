import { EAuthToken } from '@/common/constants';
import { API_URL } from '@/common/constants/urls';
import { showError } from '@/helpers/toast';
import ResponseError, { TErrorData } from '@/interfaces/error.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = axios.create({ baseURL: API_URL });

const requestHandler = async (config: AxiosRequestConfig) => {
  const accessToken = await AsyncStorage.getItem(EAuthToken.ACCESS_TOKEN);

  const configHeaders = {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    ...config.headers,
  };
  config.headers = configHeaders;
  config.params = {
    ...config.params,
    version: Date.now(),
  };
  return config as InternalAxiosRequestConfig<any>;
};

const responseErrorHandler = async (err: AxiosError<TErrorData>) => {
  if (err?.response?.status === 401) {
    await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    throw new ResponseError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!', undefined);
  }

  const data = err?.response?.data;
  const message = data?.message;

  console.log('err?.response?.data', err);

  if (message && typeof message === 'object' && message.length) {
    throw new ResponseError(message[0], data);
  }
  if (message) throw new ResponseError(message, data);
  return Promise.reject(err);
};

const responseSuccessHandler = async (response: AxiosResponse) => {
  return response;
};

axiosInstance.interceptors.request.use(requestHandler, (err: any) => {
  console.log('REEEE', err);
  return Promise.reject(err);
});
axiosInstance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);

export { axiosInstance as ApiClient };
