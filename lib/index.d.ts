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
        createWalletAndMintSbt: typeof wallet.createWalletAndMintSbt;
    };
    sbt: {
        mint: typeof sbt.mintSbt;
        revoke: typeof sbt.revokeSbt;
        exists: typeof sbt.hasSbt;
        fetch: typeof sbt.getSbtMetadata;
        update: typeof sbt.updateSbtMetadata;
    };
}
export declare function initSDK(config: QuadronSDKConfig): Quad;
export declare function getSDKConfig(): QuadronSDKConfig | null;
