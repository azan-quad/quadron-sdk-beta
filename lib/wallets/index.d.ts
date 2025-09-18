import { CreateSmartWalletForExistingRes, CreateWalletAndMintSbtReq, CreateWalletAndMintSbtRes, CreateWalletReq, CreateWalletRes, GetWalletRes, RecoverWalletRes } from "../interfaces";
declare function getWallet(): Promise<GetWalletRes | null>;
declare function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes | null>;
declare function recoverWallet(): Promise<RecoverWalletRes | null>;
declare function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes | null>;
declare function createWalletAndMintSbt(arg: CreateWalletAndMintSbtReq): Promise<CreateWalletAndMintSbtRes>;
export declare const wallet: {
    getWallet: typeof getWallet;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createWalletAndMintSbt: typeof createWalletAndMintSbt;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
};
export {};
