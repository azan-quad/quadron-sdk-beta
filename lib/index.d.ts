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
        } | null>;
        create: (cognitoSub: string, withSmartWallet: boolean) => Promise<{
            publicAddress: string;
            smartWalletAddress: string;
        } | null>;
        recover: (cognitoSub: string) => Promise<{
            address: string;
            privateKey: string;
            mnemonic: string;
        } | null>;
        smart: (cognitoSub: string) => Promise<{
            publicAddress: string;
            smartWalletAddress: string;
        } | null>;
        createWalletAndMintSbt: ({ cognitoSub, withSmartWallet, mintSBT, name, description, image, attributes, }: {
            cognitoSub: string;
            withSmartWallet: boolean;
            mintSBT: boolean;
            name?: string;
            description?: string;
            image?: string;
            attributes?: string[];
        }) => Promise<{
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
