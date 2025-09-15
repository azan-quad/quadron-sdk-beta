export declare function generateSeedAndKeys(): Promise<{
    mnemonic: string;
}>;
export declare function deriveKeysFromMnemonic(mnemonic: string, paths: {
    ethPath: string;
    solanaPath: string;
}): Promise<{
    eth: {
        privateKey: string;
        address: string;
        derivationPath: string;
    };
    solana: {
        privateKey: string;
        encodedPrivateKey: string;
        derivationPath: string;
    };
}>;
