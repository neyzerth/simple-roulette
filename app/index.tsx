import { useAnimatedWheel } from '@/components/AnimatedWheel';
import { Arrow } from '@/components/Arrow';
import { parseTextToList } from '@/components/listInput';
import Wheel from '@/components/Wheel';
import { ItemsProvider, useItems } from '@/contexts/ItemsContext';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Animated from 'react-native-reanimated';

const WheelScreen = () => {
  const [winner, setWinner] = useState("--");
  const { setItems } = useItems();
  const { spin, animatedStyle } = useAnimatedWheel(setWinner);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruletaaa 🗣️🗣️</Text>
      <Text style={styles.winner}>Winner: {winner}</Text>

      <View style={styles.wheel}>
        <Arrow />
        <Animated.View onTouchStart={spin} style={animatedStyle}>
          <Wheel />
        </Animated.View>
      </View>

      <Button title="Spin" onPress={spin} />
      <TextInput
        multiline
        numberOfLines={15}
        placeholder="Item 1..."
        placeholderTextColor="#999"
        style={styles.textArea}
        onChangeText={(text) => setItems(parseTextToList(text))}
      />
    </View>
  );
}

const Index = () => {
  return (
    <ItemsProvider initialItems={[]}>
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
  },
  textArea: {
    minHeight: 100,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top',
    fontSize: 16,
    borderRadius: 5,
  },

});


