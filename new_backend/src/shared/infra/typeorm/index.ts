import { createConnection } from 'typeorm';

export default async function postgresConnect(): Promise<void> {
    try {
        await createConnection();
        console.log('Postgres running!');
    } catch {
        console.log('[!] POSTGRES NOT CONNECTED');
    }
}
