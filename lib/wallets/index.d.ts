declare function getWallet(cognitoSub: string): Promise<{
    cognitoSub: string;
    publicAddress: string;
    smartWalletAddress: string;
    isSmartWalletDeployed: boolean;
    revoked: boolean;
} | any>;
declare function createWallet(cognitoSub: string, withSmartWallet: boolean): Promise<{
    publicAddress: string;
    smartWalletAddress: string;
} | any>;
declare function recoverWallet(cognitoSub: string): Promise<{
    address: string;
    privateKey: string;
    mnemonic: string;
} | any>;
declare function createSmartWalletForExisting(cognitoSub: string): Promise<{
    publicAddress: string;
    smartWalletAddress: string;
} | any>;
export declare const wallet: {
    getWallet: typeof getWallet;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
};
export {};
