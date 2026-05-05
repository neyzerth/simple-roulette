import { useItems } from '@/contexts/ItemsContext';
import { useCallback, useEffect, useRef } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getWinnerIndex } from '@/utils/wheelMath';

export const useWheelSpin = (onWinner?: (winner: string) => void) => {
  const { items } = useItems();
  const rotation = useSharedValue(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const spin = useCallback(() => {
    if (items.length === 0) return;

    const randomSpins = 5;
    const randomAngle = Math.random() * 360;
    const duration = 4000;

    const targetRotation = rotation.value + randomSpins * 360 + randomAngle;
    rotation.value = withTiming(targetRotation, {
      duration,
      easing: Easing.out(Easing.cubic),
    });

    timeoutRef.current = setTimeout(() => {
      const winnerIndex = getWinnerIndex(rotation.value, items.length);
      const winner = items[winnerIndex];
      onWinner?.(winner);
    }, duration + 100);
  }, [items, onWinner, rotation]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return { spin, animatedStyle };
};
