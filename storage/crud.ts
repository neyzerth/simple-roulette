import { storage } from "./db";

export interface List {
    name: string;
    rawList: string;
}

const listKey = "lists";

export const getLists = async (): Promise<List[]> => {
    try {
        const lists = await storage.getItem(listKey);
        return lists ? JSON.parse(lists) : [];
    } catch (error) {
        console.error('[crud] getLists error:', error);
        return [];
    }
}

export const addList = async (name: string, stringList: string): Promise<void> => {
    try {
        const lists = await getLists();
        const newName = parseNameList(name, lists);
        const newList = { name: newName, rawList: stringList };
        await storage.setItem(listKey, JSON.stringify([...lists, newList]));
    } catch (error) {
        console.error('[crud] addList error:', error);
    }
}

export const deleteList = async (index: number): Promise<void> => {
    try {
        const lists = await getLists();
        if (index < 0 || index >= lists.length) return;
        lists.splice(index, 1);
        await storage.setItem(listKey, JSON.stringify(lists));
    } catch (error) {
        console.error('[crud] deleteList error:', error);
    }
}

const parseNameList = (name: string, lists: List[]): string => {
    const newName = name.trim();
    if (newName.length === 0) return `List ${lists.length + 1}`;
    if (lists.some(list => list.name === newName)) return `${newName} (1)`;
    return newName;
}