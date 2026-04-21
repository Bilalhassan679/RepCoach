import { Alert, } from 'react-native';

export const showError = (message: string, title: string = 'Error') => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        style: 'default',
      },
    ],
    {
      cancelable: true,
    },
  );
};

export const showSuccess = (
  message: string,
  title: string = 'Success',
  onPress: () => void,
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        style: 'default',
        onPress: () => {
          onPress();
        },
      },
    ],
    {
      cancelable: true,
    },
  );
};
