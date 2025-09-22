export * from "./interfaces";
import { wallet } from "./wallets";
import { sbt } from "./sbt";
import { QuadronSDKConfig } from "./interfaces";
interface Quad {
    wallets: {
        get: typeof wallet.getWallet;
        create: typeof wallet.createWallet;
        recover: typeof wallet.recoverWallet;
        smart: typeof wallet.createSmartWalletForExisting;
        revoke: typeof wallet.revokeWallet;
        createWalletAndMintSbt: typeof wallet.createWalletAndMintSbt;
    };
    sbt: {
        mint: typeof sbt.mintSbt;
        revoke: typeof sbt.revokeSbt;
        getMySbt: typeof sbt.getMySbt;
        getSbtById: typeof sbt.getSbtByAccessId;
        update: typeof sbt.updateSbtMetadata;
        getPublicMetadata: typeof sbt.getPublicSbtMetadata;
    };
}
export declare function initSDK(config: QuadronSDKConfig): Quad;
export declare function getSDKConfig(): QuadronSDKConfig | null;
