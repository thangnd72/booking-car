import { TRootState } from '@/stores';
import React from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { accessToken } = useSelector((state: TRootState) => state.client);
  const userAuth = React.useMemo(() => Boolean(accessToken), [accessToken]);
  return userAuth;
};

export default useAuth;
