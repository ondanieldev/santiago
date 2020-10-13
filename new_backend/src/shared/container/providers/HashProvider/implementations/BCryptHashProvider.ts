import bcrypt from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
    public async generateHash(content: string): Promise<string> {
        return bcrypt.hash(content, 8);
    }

    public async compare(
        content: string,
        hashedConent: string,
    ): Promise<boolean> {
        return bcrypt.compare(content, hashedConent);
    }
}
