import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const rotation = useSharedValue(0);

export const spin = () => {
    const randomSpins = 5;
    const randomAngle = Math.random() * 360;

    rotation.value = withTiming(
        rotation.value + randomSpins * 360 + randomAngle,
        {
            duration: 4000,
            easing: Easing.out(Easing.cubic),
        }
    );
};

export const animatedStyle = useAnimatedStyle(() => {
    return {
        transform: [
            { rotate: `${rotation.value}deg` }
        ]
    };
});

