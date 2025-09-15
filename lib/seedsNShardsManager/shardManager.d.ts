export declare class OneShardManager {
    static generateMnemonic(strength?: 128 | 256): string;
    static createShards(mnemonic: string, total?: number, threshold?: number): string[];
    static recoverMnemonic(shards: string[]): string;
    static validateMnemonic(mnemonic: string): boolean;
}
