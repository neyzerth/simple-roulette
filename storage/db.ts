import { Platform } from 'react-native';

interface Storage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
}

let storage: Storage;

if (Platform.OS === 'web') {
    storage = {
        getItem: (key: string) => {
            try {
                const value = localStorage.getItem(key);
                return Promise.resolve(value);
            } catch (error) {
                console.error('[db][web] getItem error:', error);
                return Promise.resolve(null);
            }
        },
        setItem: (key: string, value: string) => {
            try {
                localStorage.setItem(key, value);
                return Promise.resolve();
            } catch (error) {
                console.error('[db][web] setItem error:', error);
                return Promise.resolve();
            }
        },
    };
} else {
    const openDatabaseAsync = require('expo-sqlite').openDatabaseAsync;
    const getDb = () => openDatabaseAsync('roulette.db');

    storage = {
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
}

export { storage };