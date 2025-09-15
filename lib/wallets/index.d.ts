declare function getWallet(cognitoSub: string): Promise<{
    cognitoSub: string;
    publicAddress: string;
    smartWalletAddress: string;
    isSmartWalletDeployed: boolean;
    revoked: boolean;
} | null>;
declare function createWallet(cognitoSub: string, withSmartWallet: boolean): Promise<{
    publicAddress: string;
    smartWalletAddress: string;
} | null>;
declare function recoverWallet(cognitoSub: string): Promise<{
    address: string;
    privateKey: string;
    mnemonic: string;
} | null>;
declare function createSmartWalletForExisting(cognitoSub: string): Promise<{
    publicAddress: string;
    smartWalletAddress: string;
} | null>;
declare function createWalletAndMintSbt({ cognitoSub, withSmartWallet, mintSBT, name, description, image, attributes, }: {
    cognitoSub: string;
    withSmartWallet: boolean;
    mintSBT: boolean;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
}): Promise<{
    wallet: {
        publicAddress: string;
        smartWalletAddress: string;
    } | null;
    mintedToken: {
        tokenId: number;
        owner: string;
        metadata: any;
    } | null;
} | null>;
export declare const wallet: {
    getWallet: typeof getWallet;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createWalletAndMintSbt: typeof createWalletAndMintSbt;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
};
export {};
