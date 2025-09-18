"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = void 0;
const apiClient_1 = require("../apiClient");
const sbt_1 = require("../sbt");
async function getWallet() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet");
        return res.data;
    }
    catch (error) {
        console.error("Error in getWallet:", error);
        return null;
    }
}
async function createWallet(arg) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/create", arg);
        return res.data;
    }
    catch (error) {
        console.error("Error in createWallet:", error);
        return null;
    }
}
async function recoverWallet() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post(`/wallet/recover`);
        return res.data;
    }
    catch (error) {
        console.error("Error in recoverWallet:", error);
        return null;
    }
}
async function createSmartWalletForExisting() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/smart");
        return res.data;
    }
    catch (error) {
        console.error("Error in createSmartWalletForExisting:", error);
        return null;
    }
}
async function createWalletAndMintSbt(arg) {
    try {
        const wallet = await createWallet({ withSmartWallet: arg.withSmartWallet });
        let mintedToken;
        if (arg.mintSBT) {
            mintedToken = await sbt_1.sbt.mintSbt(arg);
        }
        return { wallet, mintedToken };
    }
    catch (error) {
        console.error("Error in createWalletAndMintSbt:", error);
        return { wallet: null, mintedToken: null };
    }
}
exports.wallet = {
    getWallet,
    createWallet,
    recoverWallet,
    createWalletAndMintSbt,
    createSmartWalletForExisting,
};
