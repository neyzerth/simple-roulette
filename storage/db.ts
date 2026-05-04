import { openDatabaseAsync } from 'expo-sqlite';

interface Storage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
}

const getDb = () => openDatabaseAsync('roulette.db');

export const storage: Storage = {
    getItem: async (key: string): Promise<string | null> => {
        try {
            const db = await getDb();
            const row = await db.getFirstAsync(
                'SELECT value FROM kv WHERE key = ?', [key]
            );
            return (row as { value: string } | null)?.value ?? null;
        } catch (error) {
            console.error('[db][native] getItem error:', error);
            return null;
        }
    },
    setItem: async (key: string, value: string): Promise<void> => {
        try {
            const db = await getDb();
            await db.execAsync(
                'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT)'
            );
            await db.runAsync(
                'INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', [key, value]
            );
        } catch (error) {
            console.error('[db][native] setItem error:', error);
        }
    },
};