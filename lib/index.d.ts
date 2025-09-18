export * from "./interfaces";
import { QuadronSDKConfig } from "./interfaces";
export declare function initSDK(config: QuadronSDKConfig): {
    wallets: {
        get: () => Promise<import("./interfaces").GetWalletRes | null>;
        create: (arg: import("./interfaces").CreateWalletReq) => Promise<import("./interfaces").CreateWalletRes | null>;
        recover: () => Promise<import("./interfaces").RecoverWalletRes | null>;
        smart: () => Promise<import("./interfaces").CreateSmartWalletForExistingRes | null>;
        createWalletAndMintSbt: (arg: import("./interfaces").CreateWalletAndMintSbtReq) => Promise<import("./interfaces").CreateWalletAndMintSbtRes>;
    };
    sbt: {
        mint: (arg: import("./interfaces").MintSbtReq) => Promise<import("./interfaces").MintSbtRes | null>;
        revoke: (arg: import("./interfaces").RevokeSbtReq) => Promise<any>;
        exists: () => Promise<any>;
        fetch: () => Promise<import("./interfaces").GetSbtMetadataRes | null>;
        update: (updates: import("./interfaces").UpdateSbtMetadataReq) => Promise<import("./interfaces").UpdateSbtMetadataRes | null>;
    };
};
export declare function getSDKConfig(): QuadronSDKConfig | null;
