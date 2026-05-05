import { useCallback } from 'react';
import {
  Pressable,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useThemeStyles } from '@/styles/useThemeStyles';

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
  const { presets, colors } = useThemeStyles();

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

  const isWeb = Platform.OS === 'web';

  return (
    <View style={[styles.container, isWeb && styles.webContainer]}>
      <TextInput
        placeholder="List name..."
        placeholderTextColor={colors.placeholder}
        style={[
          presets.input,
          styles.nameInput,
          isWeb && styles.webNameInput,
        ]}
        value={listName}
        onChangeText={onChangeName}
      />

      <TextInput
        multiline
        numberOfLines={isWeb ? 8 : 5}
        placeholder="Item 1, Item 2, Item 3..."
        placeholderTextColor={colors.placeholder}
        style={[
          presets.input,
          styles.textArea,
          isWeb && styles.webTextArea,
        ]}
        value={rawList}
        onChangeText={handleTextChange}
      />

      <Pressable
        onPress={handleSave}
        disabled={!rawList.trim()}
        style={({ pressed }) => [
          styles.saveButton,
          { backgroundColor: colors.accent },
          !rawList.trim() && styles.saveButtonDisabled,
          pressed && styles.saveButtonPressed,
        ]}
      >
        <Text style={styles.saveButtonText}>Save List</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  webContainer: {
    alignItems: 'stretch',
  },
  nameInput: {
    height: 44,
    width: 250,
  },
  webNameInput: {
    width: '100%',
  },
  textArea: {
    minHeight: 80,
    width: 250,
    textAlignVertical: 'top',
  },
  webTextArea: {
    width: '100%',
    minHeight: 120,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
