"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = void 0;
const apiClient_1 = require("../apiClient");
async function getWallet(cognitoSub) {
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.post("/wallet", { cognitoSub });
    return res.data;
}
async function createWallet(cognitoSub, withSmartWallet) {
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.post("/wallet/create", { cognitoSub, withSmartWallet });
    return res.data;
}
async function recoverWallet(cognitoSub) {
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.post(`/wallet/recover`, { cognitoSub });
    return res.data;
}
async function createSmartWalletForExisting(cognitoSub) {
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.post("/wallet/smart", { cognitoSub });
    return res.data;
}
exports.wallet = {
    getWallet,
    createWallet,
    recoverWallet,
    createSmartWalletForExisting,
};
