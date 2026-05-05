import { useCallback } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List } from '@/storage/types';

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
  const handleDelete = useCallback(
    (id: string) => {
      onDelete(id);
    },
    [onDelete]
  );

  return (
    <View style={styles.container}>
      {lists.length === 0 && (
        <Text style={styles.emptyText}>No saved lists yet</Text>
      )}

      {lists.map((list) => (
        <Pressable
          key={list.id}
          style={styles.listItem}
          onPress={() => onLoad(list)}
        >
          <View style={styles.listContent}>
            <Text style={styles.listName}>{list.name}</Text>
            <Text style={styles.listPreview} numberOfLines={1}>
              {list.rawList}
            </Text>
          </View>
          <Button title="Delete" onPress={() => handleDelete(list.id)} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxHeight: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listContent: {
    flex: 1,
    marginRight: 8,
  },
  listName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listPreview: {
    color: '#666',
    fontSize: 12,
  },
});
