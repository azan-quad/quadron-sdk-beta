"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSDK = initSDK;
exports.updateAccessToken = updateAccessToken;
exports.getSDKConfig = getSDKConfig;
__exportStar(require("./interfaces"), exports);
const wallets_1 = require("./wallets");
const sbt_1 = require("./sbt");
let sdkConfig = null;
function initSDK(config) {
    if (!config || !config.API_BASE_URL) {
        throw new Error("API_BASE_URL is required to initialize the SDK");
    }
    if (config.isClient && !config.ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN is required to initialize the SDK on client side");
    }
    if (!config.isClient && !config.API_KEY) {
        throw new Error("API_KEY is required to initialize the SDK on server side");
    }
    sdkConfig = config;
    return {
        wallets: {
            get: wallets_1.wallet.getWallet,
            getBySub: wallets_1.wallet.getWalletBySub,
            create: wallets_1.wallet.createWallet,
            recover: wallets_1.wallet.recoverWallet,
            smart: wallets_1.wallet.createSmartWalletForExisting,
            revoke: wallets_1.wallet.revokeWallet,
        },
        sbt: {
            mint: sbt_1.sbt.mintSbt,
            revoke: sbt_1.sbt.revokeSbt,
            getMySbt: sbt_1.sbt.getMySbt,
            getSbtBySub: sbt_1.sbt.getSbtBySub,
            update: sbt_1.sbt.updateSbtMetadata,
            getPublicMetadata: sbt_1.sbt.getPublicSbtMetadata,
        },
    };
}
function updateAccessToken(newToken) {
    if (!sdkConfig) {
        throw new Error("SDK not initialized. Please call initSDK first.");
    }
    if (!sdkConfig.isClient) {
        throw new Error("updateAccessToken can only be used in client mode");
    }
    sdkConfig.ACCESS_TOKEN = newToken;
    return sdkConfig;
}
function getSDKConfig() {
    return sdkConfig;
}
