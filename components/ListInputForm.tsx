import { useCallback } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface ListInputFormProps {
  listName: string;
  rawList: string;
  onChangeName: (name: string) => void;
  onChangeRawList: (text: string, items: string[]) => void;
  onSave: () => void;
}

export const ListInputForm = ({
  listName,
  rawList,
  onChangeName,
  onChangeRawList,
  onSave,
}: ListInputFormProps) => {
  const handleSave = useCallback(() => {
    onSave();
  }, [onSave]);

  const handleTextChange = useCallback((text: string) => {
    const items = text
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    onChangeRawList(text, items);
  }, [onChangeRawList]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="List name..."
        placeholderTextColor="#999"
        style={styles.nameInput}
        value={listName}
        onChangeText={onChangeName}
      />

      <TextInput
        multiline
        numberOfLines={5}
        placeholder="Item 1, Item 2, Item 3..."
        placeholderTextColor="#999"
        style={styles.textArea}
        value={rawList}
        onChangeText={handleTextChange}
      />

      <Button
        title="Save List"
        onPress={handleSave}
        disabled={!rawList.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  nameInput: {
    height: 40,
    width: 250,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    borderRadius: 5,
  },
  textArea: {
    minHeight: 80,
    width: 250,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top',
    fontSize: 14,
    borderRadius: 5,
  },
});
