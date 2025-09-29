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
async function getWalletBySub(arg) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get("/wallet/getbysub", {
            params: arg,
        });
        return res.data;
    }
    catch (error) {
        console.error("Error in getWalletBySub:", error);
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
exports.wallet = {
    getWallet,
    getWalletBySub,
    createWallet,
    recoverWallet,
    createSmartWalletForExisting,
    revokeWallet,
};
