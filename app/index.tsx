import { useAnimatedWheel } from '@/components/AnimatedWheel';
import { Arrow } from '@/components/Arrow';
import Wheel from '@/components/Wheel';
import { ItemsProvider } from '@/contexts/ItemsContext';
import { useState } from 'react';
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

const WheelScreen = () => {
  const [winner, setWinner] = useState("--");
  const { spin, animatedStyle } = useAnimatedWheel(setWinner);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wheel!! 🛞😁</Text>
      <Text style={styles.winner}>Winner: {winner}</Text>

      <View style={styles.wheel}>
        <Arrow />
        <Animated.View style={animatedStyle}>
          <Wheel items={items} />
        </Animated.View>
      </View>

      <Button title="Spin" onPress={spin} />
    </View>
  );
}

const Index = () => {
  return (
    <ItemsProvider initialItems={items}>
      <WheelScreen />
    </ItemsProvider>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  wheel: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  winner: {
    fontSize: 18,
    fontWeight: "bold",
  }

});


