export interface EthereumWalletRecord {
    orgId: string;
    userId: string;
    publicAddress: string;
    kmsKeyId: string;
    encryptedShard1: string;
    encryptedShard3: string;
    shard2: string;
}
export declare function createEthereumWallet(orgId: string, userId: string): Promise<EthereumWalletRecord>;
