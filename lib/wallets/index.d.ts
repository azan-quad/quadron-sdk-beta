import { GetWalletBySubReq, CreateSmartWalletForExistingRes, CreateWalletReq, CreateWalletRes, GetWalletRes, RecoverWalletRes, RevokeWalletReq, RevokeWalletRes } from "../interfaces";
declare function getWallet(): Promise<GetWalletRes | null>;
declare function getWalletBySub(arg: GetWalletBySubReq): Promise<GetWalletRes | null>;
declare function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes | null>;
declare function recoverWallet(): Promise<RecoverWalletRes | null>;
declare function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes | null>;
declare function revokeWallet(arg: RevokeWalletReq): Promise<RevokeWalletRes | null>;
export declare const wallet: {
    getWallet: typeof getWallet;
    getWalletBySub: typeof getWalletBySub;
    createWallet: typeof createWallet;
    recoverWallet: typeof recoverWallet;
    createSmartWalletForExisting: typeof createSmartWalletForExisting;
    revokeWallet: typeof revokeWallet;
};
export {};
