export interface QuadronSDKConfig {
    API_BASE_URL: string;
    API_KEY?: string;
}
export declare function initSDK(config: QuadronSDKConfig): {
    wallets: {
        get: (cognitoSub: string) => Promise<{
            cognitoSub: string;
            publicAddress: string;
            smartWalletAddress: string;
            isSmartWalletDeployed: boolean;
            revoked: boolean;
        } | any>;
        create: (cognitoSub: string, withSmartWallet: boolean) => Promise<{
            publicAddress: string;
            smartWalletAddress: string;
        } | any>;
        recover: (cognitoSub: string) => Promise<{
            address: string;
            privateKey: string;
            mnemonic: string;
        } | any>;
        smart: (cognitoSub: string) => Promise<{
            publicAddress: string;
            smartWalletAddress: string;
        } | any>;
    };
    sbt: {
        mint: (userAddress: string, name?: string, description?: string, image?: string, attributes?: string[]) => Promise<{
            tokenId: number;
            owner: string;
            metadata: any;
        } | any>;
        revoke: (tokenId: number) => Promise<any>;
        exists: (userAddress: string) => Promise<any>;
        fetch: (tokenId: number) => Promise<{
            tokenId: number;
            name?: string;
            description?: string;
            image?: string;
            attributes?: string[];
        } | any>;
        update: (tokenId: number, updates: object) => Promise<{
            tokenId: number;
            name?: string;
            description?: string;
            image?: string;
            attributes?: string[];
        } | any>;
    };
};
export declare function getSDKConfig(): QuadronSDKConfig | null;
