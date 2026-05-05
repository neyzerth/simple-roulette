import { useState, useCallback } from 'react';
import { useWheelSpin } from './useWheelSpin';

interface UseWheelGameReturn {
  winner: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  spin: () => void;
  animatedStyle: ReturnType<typeof useWheelSpin>['animatedStyle'];
}

export const useWheelGame = (): UseWheelGameReturn => {
  const [winner, setWinner] = useState('--');
  const [modalVisible, setModalVisible] = useState(false);

  const handleWinner = useCallback((winnerName: string) => {
    setWinner(winnerName);
    setModalVisible(true);
  }, []);

  const { spin, animatedStyle } = useWheelSpin(handleWinner);

  return {
    winner,
    modalVisible,
    setModalVisible,
    spin,
    animatedStyle,
  };
};
