export interface SeedStorageResult {
    kmsKeyId: string;
    s3Bucket: string;
    s3Key: string;
    secretName: string;
}
export declare class EncryptedSeedManager {
    private readonly bucket;
    private readonly objectKey;
    private readonly secretName;
    private kms;
    private s3;
    private secretsManager;
    constructor(bucket: string, objectKey: string, secretName: string);
    generateAndStoreSeed(providedKmsKeyId?: string): Promise<SeedStorageResult>;
    recoverWallets(params: {
        kmsKeyId: string;
        ethPath: string;
        solPath: string;
    }): Promise<import("./utils/recoverSeedAndWallets").WalletRecoveryOutput>;
}
