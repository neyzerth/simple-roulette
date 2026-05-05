import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { Platform } from 'react-native';

interface Storage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
}

let dbInstance: SQLiteDatabase | null = null;
let initPromise: Promise<void> | null = null;

// For web, use localStorage as a fallback due to SQLite File System Access Handle issues
const isWeb = Platform.OS === 'web';

const getDb = async (): Promise<SQLiteDatabase> => {
    if (dbInstance) return dbInstance;
    
    dbInstance = await openDatabaseAsync('roulette.db');
    return dbInstance;
};

const initDatabase = async (): Promise<void> => {
    if (isWeb) {
        // On web, skip SQLite initialization and use localStorage
        return;
    }
    
    if (initPromise) return initPromise;
    
    initPromise = (async () => {
        const db = await getDb();
        await db.execAsync(
            'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT)'
        );
    })();
    
    return initPromise;
};

// Initialize on module load for native platforms
if (!isWeb) {
    initDatabase().catch(console.error);
}

export const storage: Storage = {
    getItem: async (key: string): Promise<string | null> => {
        try {
            if (isWeb) {
                // Use localStorage on web to avoid SQLite File System Access Handle issues
                const value = localStorage.getItem(key);
                return value;
            }
            
            await initDatabase();
            const db = await getDb();
            const row = await db.getFirstAsync(
                'SELECT value FROM kv WHERE key = ?', [key]
            );
            return (row as { value: string } | null)?.value ?? null;
        } catch (error) {
            console.error('[db] getItem error:', error);
            // Fallback to localStorage on error
            if (isWeb) {
                return localStorage.getItem(key);
            }
            return null;
        }
    },
    setItem: async (key: string, value: string): Promise<void> => {
        try {
            if (isWeb) {
                // Use localStorage on web to avoid SQLite File System Access Handle issues
                localStorage.setItem(key, value);
                return;
            }
            
            await initDatabase();
            const db = await getDb();
            await db.runAsync(
                'INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', [key, value]
            );
        } catch (error) {
            console.error('[db] setItem error:', error);
            // Fallback to localStorage on error
            if (isWeb) {
                localStorage.setItem(key, value);
            }
        }
    },
};
