import { useCallback } from 'react';
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List } from '@/storage/types';
import { useThemeStyles } from '@/styles/useThemeStyles';

interface SavedListsPanelProps {
  lists: List[];
  onLoad: (list: List) => void;
  onDelete: (id: string) => void;
}

export const SavedListsPanel = ({
  lists,
  onLoad,
  onDelete,
}: SavedListsPanelProps) => {
  const { presets, colors } = useThemeStyles();

  const handleDelete = useCallback(
    (id: string) => {
      onDelete(id);
    },
    [onDelete]
  );

  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={[
        presets.card,
        styles.container,
        isWeb && styles.webContainer,
      ]}
    >
      {lists.length === 0 && (
        <Text style={[presets.text.mutedItalic, styles.emptyText]}>
          No saved lists yet
        </Text>
      )}

      {lists.map((list, index) => (
        <Pressable
          key={list.id}
          style={[
            styles.listItem,
            index < lists.length - 1 && { borderBottomColor: colors.borderLight },
          ]}
          onPress={() => onLoad(list)}
        >
          <View style={styles.listContent}>
            <Text style={presets.text.bodyBold}>
              {list.name}
            </Text>
            <Text
              style={presets.text.secondary}
              numberOfLines={1}
            >
              {list.rawList}
            </Text>
          </View>
          <Button
            title="Delete"
            onPress={() => handleDelete(list.id)}
            color={colors.danger}
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 12,
  },
  webContainer: {
    width: '100%',
    maxHeight: 400,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
  },
  listContent: {
    flex: 1,
    marginRight: 8,
  },
});
