import { useState, useCallback, useEffect } from 'react';
import { useItems } from '@/contexts/ItemsContext';
import { addList, deleteList, getLists, List } from '@/storage/crud';
import { parseTextToList } from '@/utils/listParser';

interface UseSavedListsReturn {
  rawList: string;
  setRawList: (value: string) => void;
  listName: string;
  setListName: (value: string) => void;
  savedLists: List[];
  handleSave: () => Promise<void>;
  handleLoad: (list: List) => void;
  handleDelete: (id: string) => Promise<void>;
}

export const useSavedLists = (): UseSavedListsReturn => {
  const { setItems } = useItems();
  const [rawList, setRawList] = useState('');
  const [listName, setListName] = useState('');
  const [savedLists, setSavedLists] = useState<List[]>([]);

  const loadSavedLists = useCallback(async () => {
    const lists = await getLists();
    setSavedLists(lists);
  }, []);

  useEffect(() => {
    loadSavedLists();
  }, [loadSavedLists]);

  const handleSave = useCallback(async () => {
    if (!rawList.trim()) return;
    await addList(listName, rawList);
    setListName('');
    setRawList('');
    await loadSavedLists();
  }, [listName, rawList, loadSavedLists]);

  const handleLoad = useCallback(
    (list: List) => {
      setRawList(list.rawList);
      setItems(parseTextToList(list.rawList));
    },
    [setItems]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteList(id);
      await loadSavedLists();
    },
    [loadSavedLists]
  );

  return {
    rawList,
    setRawList,
    listName,
    setListName,
    savedLists,
    handleSave,
    handleLoad,
    handleDelete,
  };
};
