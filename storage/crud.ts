import { storage } from "./db";

export interface List {
    name: string;
    rawList: string;
}

const listKey = "lists";

export const getLists = async (): Promise<List[]> => {
    const lists = await storage.getItem(listKey);
    return lists ? JSON.parse(lists) : [];
}

export const addList = async (name: string | undefined, stringList: string) => {
    const lists = await getLists();
    const newList = { name: await parseNameList(name || ""), rawList: stringList };
    await storage.setItem(listKey, JSON.stringify([...lists, newList]));
}

export const parseNameList = async (name: string): Promise<string> => {
    const lists = await getLists();
    const newName = name.trim();
    if (newName.length === 0) return `List ${lists.length + 1}`;
    if (lists.some(list => list.name === newName)) return `${newName} (1)`;
    return newName;
}