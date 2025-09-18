"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSDK = initSDK;
exports.getSDKConfig = getSDKConfig;
const wallets_1 = require("./wallets");
const sbt_1 = require("./sbt");
let sdkConfig = null;
function initSDK(config) {
    if (!config || !config.API_BASE_URL) {
        throw new Error("API_BASE_URL is required to initialize the SDK");
    }
    if (config.isClient && !config.COGNITO_JWT) {
        throw new Error("COGNITO_JWT is required to initialize the SDK on client side");
    }
    if (!config.isClient && !config.API_KEY) {
        throw new Error("API_KEY is required to initialize the SDK on server side");
    }
    sdkConfig = config;
    return {
        wallets: {
            get: wallets_1.wallet.getWallet,
            create: wallets_1.wallet.createWallet,
            recover: wallets_1.wallet.recoverWallet,
            smart: wallets_1.wallet.createSmartWalletForExisting,
            createWalletAndMintSbt: wallets_1.wallet.createWalletAndMintSbt,
        },
        sbt: {
            mint: sbt_1.sbt.mintSbt,
            revoke: sbt_1.sbt.revokeSbt,
            exists: sbt_1.sbt.hasSbt,
            fetch: sbt_1.sbt.getSbtMetadata,
            update: sbt_1.sbt.updateSbtMetadata,
        },
    };
}
function getSDKConfig() {
    return sdkConfig;
}
