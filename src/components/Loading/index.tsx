/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import theme from '@/helpers/theme';

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </View>
  );
};
