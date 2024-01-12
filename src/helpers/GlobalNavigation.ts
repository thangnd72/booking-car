import React from 'react';
import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef: React.Ref<NavigationContainerRef<any>> = React.createRef();
export const navigate = <T>(routeName: string, params?: T) => {
  navigationRef?.current?.navigate(routeName, params);
};

export const reset = (routeName: string) => {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: routeName }],
    }),
  );
};

export const goBack = () => navigationRef?.current?.goBack();

export const currentRoute = () => navigationRef.current?.getCurrentRoute();

export const push = <T extends object>(screenCount: string, params: T) => {
  navigationRef?.current?.dispatch(StackActions.push(screenCount, params));
};

export const setParams = <T extends object>(params: T) => {
  navigationRef?.current?.dispatch(CommonActions.setParams(params));
};

export const pop = (screenCount: number) => {
  navigationRef?.current?.dispatch(StackActions.pop(screenCount));
};

export const popToTop = () => {
  navigationRef?.current?.dispatch(StackActions.popToTop());
};

const GlobalNavigation = {
  pop,
  push,
  reset,
  goBack,
  navigate,
  popToTop,
  setParams,
  currentRoute,
};

export default GlobalNavigation;
