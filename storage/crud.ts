import { storage } from './db';
import { List } from './types';

const STORAGE_KEY = 'lists';

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const parseNameList = (name: string, lists: List[]): string => {
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return `List ${lists.length + 1}`;
  }
  if (lists.some((list) => list.name === trimmedName)) {
    return `${trimmedName} (1)`;
  }
  return trimmedName;
};

export const getLists = async (): Promise<List[]> => {
  try {
    const data = await storage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('[crud] getLists error:', error);
    return [];
  }
};

export const addList = async (name: string, rawList: string): Promise<void> => {
  try {
    const lists = await getLists();
    const newList: List = {
      id: generateId(),
      name: parseNameList(name, lists),
      rawList,
    };
    await storage.setItem(STORAGE_KEY, JSON.stringify([...lists, newList]));
  } catch (error) {
    console.error('[crud] addList error:', error);
  }
};

export const deleteList = async (id: string): Promise<void> => {
  try {
    const lists = await getLists();
    const filtered = lists.filter((list) => list.id !== id);
    await storage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('[crud] deleteList error:', error);
  }
};

export type { List };
