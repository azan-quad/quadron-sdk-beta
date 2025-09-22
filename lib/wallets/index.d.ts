import { CreateSmartWalletForExistingRes, CreateWalletAndMintSbtReq, CreateWalletAndMintSbtRes, CreateWalletReq, CreateWalletRes, GetWalletRes, RecoverWalletRes, RevokeWalletReq, RevokeWalletRes } from "../interfaces";
declare function getWallet(): Promise<GetWalletRes | null>;
declare function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes | null>;
declare function recoverWallet(): Promise<RecoverWalletRes | null>;
declare function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes | null>;
declare function revokeWallet(arg: RevokeWalletReq): Promise<RevokeWalletRes | null>;
declare function createWalletAndMintSbt(arg: CreateWalletAndMintSbtReq): Promise<CreateWalletAndMintSbtRes | null>;
export declare const wallet: {
    getWallet: typeof getWallet;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
    revokeWallet: typeof revokeWallet;
    createWalletAndMintSbt: typeof createWalletAndMintSbt;
};
export {};
