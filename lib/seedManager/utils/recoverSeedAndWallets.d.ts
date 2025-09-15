interface WalletRecoveryInput {
    kmsKeyId: string;
    bucketName: string;
    objectKey: string;
    secretName: string;
    ethereumDerivationPath: string;
    solanaDerivationPath: string;
}
interface WalletRecoveryOutput {
    ethereum: {
        address: string;
        privateKey: string;
    };
    solana: {
        address: string;
        privateKey: string;
    };
}
export declare function recoverSeedAndWallets({ kmsKeyId, bucketName, objectKey, secretName, ethereumDerivationPath, solanaDerivationPath, }: WalletRecoveryInput): Promise<WalletRecoveryOutput>;
export type { WalletRecoveryOutput };
