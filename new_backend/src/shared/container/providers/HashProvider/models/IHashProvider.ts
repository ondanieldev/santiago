export default interface IHashProvider {
    generateHash(content: string): Promise<string>;
    compare(content: string, hashedContent: string): Promise<boolean>;
}
