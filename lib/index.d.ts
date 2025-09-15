import { KMSClientConfig } from "@aws-sdk/client-kms";
import * as ethereum from "./ethereum/generateEthereumWallet";
import { evmTxUtils } from "./ethereum/ethTxUtils";
import { EncryptedSeedManager } from "./seedManager/EncryptedSeedManager";
import { OneShardManager } from "./seedsNShardsManager/shardManager";
import * as sbt from "./sbt";
export declare function initSDK(config?: KMSClientConfig): {
    ethereum: {
        createWallet: typeof ethereum.generateEthereumWallet;
        evmTxUtilsClass: typeof evmTxUtils;
    };
    seedManager: {
        EncryptedSeedManager: typeof EncryptedSeedManager;
        OneShardManager: typeof OneShardManager;
    };
    sbt: {
        mintSbt: typeof sbt.mintSbt;
        revokeSbt: typeof sbt.revokeSbt;
        hasSbt: typeof sbt.hasSbt;
        totalSupply: typeof sbt.totalSupply;
    };
};
