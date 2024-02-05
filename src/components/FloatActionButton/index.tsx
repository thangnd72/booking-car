import { CallIcon, PhoneCallIcon, ZaloIcon } from '@/assets/icons';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Box } from '../Box';
import { Button } from '../Button';
import { styles } from './styles';

interface IProps {}

export const FloatActionButton = (props: IProps) => {
  const firstValue = useSharedValue(30);
  const secondValue = useSharedValue(30);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() => (isOpen.value ? withTiming(1) : withTiming(0)));

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    };
    if (isOpen.value) {
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(120));
      secondValue.value = withDelay(100, withSpring(180));
    }
    isOpen.value = !isOpen.value;
  };

  const firstIcon = useAnimatedStyle(() => {
    const scale = interpolate(firstValue.value, [10, 120], [0, 1], Extrapolation.CLAMP);

    return {
      bottom: firstValue.value,
      transform: [{ scale }],
    };
  });

  const secondIcon = useAnimatedStyle(() => {
    const scale = interpolate(secondValue.value, [10, 180], [0, 1], Extrapolation.CLAMP);
    return {
      bottom: secondValue.value,
      transform: [{ scale }],
    };
  });

  const callIcon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 45}deg` }],
  }));

  return (
    <Box flex={1}>
      <Animated.View style={[styles.contentContainer, secondIcon]}>
        <Button>
          <ZaloIcon width={40} height={40} />
        </Button>
      </Animated.View>
      <Animated.View style={[styles.contentContainer, firstIcon]}>
        <Button>
          <PhoneCallIcon />
        </Button>
      </Animated.View>
      <Pressable style={styles.contentContainer} onPress={handlePress}>
        <Animated.View style={callIcon}>
          <CallIcon />
        </Animated.View>
      </Pressable>
    </Box>
  );
};
