import { CreateSmartWalletForExistingRes, CreateWalletAndMintSbtReq, CreateWalletAndMintSbtRes, CreateWalletReq, CreateWalletRes, GetWalletRes, RecoverWalletRes } from "../interfaces";
declare function getWallet(): Promise<GetWalletRes>;
declare function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes>;
declare function recoverWallet(): Promise<RecoverWalletRes>;
declare function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes>;
declare function createWalletAndMintSbt(arg: CreateWalletAndMintSbtReq): Promise<CreateWalletAndMintSbtRes>;
export declare const wallet: {
    getWallet: typeof getWallet;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createWalletAndMintSbt: typeof createWalletAndMintSbt;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
};
export {};
