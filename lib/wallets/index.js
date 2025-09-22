"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = void 0;
const apiClient_1 = require("../apiClient");
async function getWallet() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get("/wallet/");
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
        const res = await apiClient.post("/wallet/recover");
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
async function revokeWallet(arg) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/revoke", arg);
        return res.data;
    }
    catch (error) {
        console.error("Error in revokeWallet:", error);
        return null;
    }
}
async function createWalletAndMintSbt(arg) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const walletRes = await apiClient.post("/wallet/create", {
            withSmartWallet: arg.withSmartWallet,
            cognitoSub: arg.cognitoSub,
        });
        let sbtRes = undefined;
        if (arg.mintSbt) {
            const mintReq = { cognitoSub: arg.cognitoSub };
            const mintRes = await apiClient.post("/sbt/mint", mintReq);
            sbtRes = mintRes.data;
        }
        return {
            wallet: walletRes.data,
            sbt: sbtRes,
        };
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
    createSmartWalletForExisting,
    revokeWallet,
    createWalletAndMintSbt,
};
