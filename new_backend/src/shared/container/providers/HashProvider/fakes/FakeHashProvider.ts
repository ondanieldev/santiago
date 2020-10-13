import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
    public async generateHash(content: string): Promise<string> {
        return content;
    }

    public async compare(
        content: string,
        hashedConent: string,
    ): Promise<boolean> {
        return content === hashedConent;
    }
}
