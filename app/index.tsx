import Wheel from '@/components/Wheel/Wheel';
import React from 'react';
import { Text, View } from "react-native";

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
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this text.</Text>

      <Wheel items={items} />

    </View>
  );
}
const style = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  semicircle: {
    width: 100,
    height: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#a6f",
  },
};


