export interface QuadronSDKConfig {
    API_BASE_URL: string;
    isClient: boolean;
    COGNITO_JWT?: string;
    API_KEY?: string;
}
export declare function initSDK(config: QuadronSDKConfig): {
    wallets: {
        get: () => Promise<import("./interfaces").GetWalletRes>;
        create: (arg: import("./interfaces").CreateWalletReq) => Promise<import("./interfaces").CreateWalletRes>;
        recover: () => Promise<import("./interfaces").RecoverWalletRes>;
        smart: () => Promise<import("./interfaces").CreateSmartWalletForExistingRes>;
        createWalletAndMintSbt: (arg: import("./interfaces").CreateWalletAndMintSbtReq) => Promise<import("./interfaces").CreateWalletAndMintSbtRes>;
    };
    sbt: {
        mint: (arg: import("./interfaces").MintSbtReq) => Promise<import("./interfaces").MintSbtRes>;
        revoke: (arg: import("./interfaces").RevokeSbtReq) => Promise<any>;
        exists: () => Promise<any>;
        fetch: () => Promise<import("./interfaces").GetSbtMetadataRes>;
        update: (updates: import("./interfaces").UpdateSbtMetadataReq) => Promise<import("./interfaces").UpdateSbtMetadataRes>;
    };
};
export declare function getSDKConfig(): QuadronSDKConfig | null;
