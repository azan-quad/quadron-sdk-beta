import { GetWalletBySubReq, CreateSmartWalletForExistingRes, CreateWalletReq, CreateWalletRes, GetWalletRes, RecoverWalletRes, RevokeWalletReq, RevokeWalletRes } from "../interfaces";
declare function getWallet(): Promise<GetWalletRes>;
declare function getWalletBySub(arg: GetWalletBySubReq): Promise<GetWalletRes>;
declare function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes>;
declare function recoverWallet(): Promise<RecoverWalletRes>;
declare function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes>;
declare function revokeWallet(arg: RevokeWalletReq): Promise<RevokeWalletRes>;
export declare const wallet: {
    getWallet: typeof getWallet;
    getWalletBySub: typeof getWalletBySub;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
    revokeWallet: typeof revokeWallet;
};
export {};
