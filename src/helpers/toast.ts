import Toast from 'react-native-toast-message';

export const showSuccess = (message: string) => {
  Toast.show({
    type: 'successMessage',
    props: {
      message: message,
    },
  });
};

export const showError = (message: string) => {
  Toast.show({
    type: 'errorMessage',
    props: {
      message: message,
    },
  });
};
