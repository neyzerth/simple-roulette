import { useCallback, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useThemeStyles } from '@/styles/useThemeStyles';

interface WinnerModalProps {
  visible: boolean;
  winner: string;
  onClose: () => void;
  onDelete: () => void;
}

export const WinnerModal = ({
  visible,
  winner,
  onClose,
  onDelete,
}: WinnerModalProps) => {
  const { presets } = useThemeStyles();
  const confettiRef = useRef<ConfettiCannon>(null);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (visible && !hasFiredRef.current && confettiRef.current) {
      confettiRef.current.start();
      hasFiredRef.current = true;
    }
    if (!visible) {
      hasFiredRef.current = false;
    }
  }, [visible]);

  const handleDelete = useCallback(() => {
    onDelete();
    onClose();
  }, [onDelete, onClose]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalPress = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={presets.modal.backdrop}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={presets.modal.container}>
              <ConfettiCannon
                ref={confettiRef}
                count={200}
                origin={{ x: -10, y: 0 }}
                autoStart={false}
                fadeOut
              />

              <Text style={[presets.text.title, styles.titleMargin]}>
                We have a winner!
              </Text>
              <Text style={[presets.text.winner, styles.winnerMargin]}>
                {winner}
              </Text>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[presets.button.base, presets.button.danger]}
                  onPress={handleDelete}
                >
                  <Text style={presets.button.dangerText}>
                    Delete Item
                  </Text>
                </Pressable>

                <Pressable
                  style={[presets.button.base, presets.button.primary]}
                  onPress={onClose}
                >
                  <Text style={presets.button.primaryText}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleMargin: {
    marginBottom: 16,
  },
  winnerMargin: {
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 12,
  },
});
