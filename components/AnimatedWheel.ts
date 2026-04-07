import { useItems } from '@/contexts/ItemsContext';
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { getWinnerIndex } from './useWheelMaths';

export const useAnimatedWheel = () => {
    const { items } = useItems();
    const rotation = useSharedValue(0);

    const spin = () => {
        const randomSpins = 5;
        const randomAngle = Math.random() * 360;
        const duration = 4000;

        const initialIndex = getWinnerIndex(rotation.value, items.length);
        console.log('Init:', items[initialIndex], `[${initialIndex}]`);


        rotation.value = withTiming(
            rotation.value + randomSpins * 360 + randomAngle,
            {
                duration: duration,
                easing: Easing.out(Easing.cubic),
            }
        );

        setTimeout(() => {
            const winnerIndex = getWinnerIndex(rotation.value, items.length);
            console.log('Winner:', items[winnerIndex], `[${winnerIndex}]`);
        }, duration + 100);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` }
            ]
        };
    });

    return { spin, animatedStyle };
};

