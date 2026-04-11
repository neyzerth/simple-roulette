// storage/db.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('roulette.db');

db.execSync(`CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT)`);

export const storage = {
    getItem: (key: string) => {
        const row = db.getFirstSync<{ value: string }>(
            'SELECT value FROM kv WHERE key = ?', [key]
        );
        return Promise.resolve(row?.value ?? null);
    },
    setItem: (key: string, value: string) => {
        db.runSync(
            'INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', [key, value]
        );
        return Promise.resolve();
    },
};