import { animatedStyle, spin } from '@/components/AnimatedWheel';
import Wheel from '@/components/Wheel';
import { Button, StyleSheet, Text, View } from "react-native";
import Animated from 'react-native-reanimated';

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
];

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>My Wheel!! 🛞😁</Text>

      <Animated.View style={animatedStyle}>
        <Wheel items={items} />
      </Animated.View>

      <Button title="Spin" onPress={spin} />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    gap: 20
  }
});


