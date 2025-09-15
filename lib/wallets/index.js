"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = void 0;
const apiClient_1 = require("../apiClient");
const sbt_1 = require("../sbt");
async function getWallet(cognitoSub) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet", { cognitoSub });
        return res.data;
    }
    catch (error) {
        console.error("Error in getWallet:", error);
        return null;
    }
}
async function createWallet(cognitoSub, withSmartWallet) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/create", { cognitoSub, withSmartWallet });
        return res.data;
    }
    catch (error) {
        console.error("Error in createWallet:", error);
        return null;
    }
}
async function recoverWallet(cognitoSub) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post(`/wallet/recover`, { cognitoSub });
        return res.data;
    }
    catch (error) {
        console.error("Error in recoverWallet:", error);
        return null;
    }
}
async function createSmartWalletForExisting(cognitoSub) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/smart", { cognitoSub });
        return res.data;
    }
    catch (error) {
        console.error("Error in createSmartWalletForExisting:", error);
        return null;
    }
}
async function createWalletAndMintSbt({ cognitoSub, withSmartWallet = true, mintSBT = true, name, description, image, attributes, }) {
    try {
        const wallet = await createWallet(cognitoSub, withSmartWallet);
        let mintedToken;
        if (mintSBT) {
            mintedToken = await sbt_1.sbt.mintSbt(wallet === null || wallet === void 0 ? void 0 : wallet.publicAddress, name, description, image, attributes);
        }
        return { wallet, mintedToken };
    }
    catch (error) {
        console.error("Error in createWalletAndMintSbt:", error);
        return null;
    }
}
exports.wallet = {
    getWallet,
    createWallet,
    recoverWallet,
    createWalletAndMintSbt,
    createSmartWalletForExisting,
};
