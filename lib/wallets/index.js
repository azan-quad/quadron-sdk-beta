"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = void 0;
const apiClient_1 = require("../apiClient");
async function getWallet() {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get("/wallet/");
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_USER_SUB") {
            throw new Error("User authentication required");
        }
        if (errorCode === "WALLET_NOT_FOUND") {
            throw new Error("Wallet not found for this user");
        }
        if (errorCode === "WALLET_RETRIEVAL_FAILED") {
            throw new Error("Failed to retrieve wallet information");
        }
        console.error("Error in getWallet:", errorMessage || error);
        throw error;
    }
}
async function getWalletBySub(arg) {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/getbysub", arg);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_REQUIRED_FIELD") {
            throw new Error("userSub is required in request body");
        }
        if (errorCode === "WALLET_NOT_FOUND") {
            throw new Error("Wallet not found for this user");
        }
        if (errorCode === "WALLET_RETRIEVAL_FAILED") {
            throw new Error("Failed to retrieve wallet information");
        }
        console.error("Error in getWalletBySub:", errorMessage || error);
        throw error;
    }
}
async function createWallet(arg) {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/create", arg);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_USER_SUB") {
            throw new Error("User authentication required");
        }
        if (errorCode === "WALLET_ALREADY_EXISTS") {
            throw new Error("Wallet already exists for this user");
        }
        if (errorCode === "WALLET_CREATION_FAILED") {
            throw new Error("Failed to create wallet");
        }
        console.error("Error in createWallet:", errorMessage || error);
        throw error;
    }
}
async function recoverWallet() {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/recover");
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_USER_SUB") {
            throw new Error("User authentication required");
        }
        if (errorCode === "WALLET_NOT_FOUND") {
            throw new Error("Wallet not found for this user");
        }
        if (errorCode === "WALLET_RECOVERY_FAILED") {
            throw new Error("Failed to recover wallet");
        }
        console.error("Error in recoverWallet:", errorMessage || error);
        throw error;
    }
}
async function createSmartWalletForExisting() {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/smart");
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_USER_SUB") {
            throw new Error("User authentication required");
        }
        if (errorCode === "BASE_WALLET_NOT_FOUND") {
            throw new Error("Base wallet not found for smart wallet creation");
        }
        if (errorCode === "SMART_WALLET_ALREADY_EXISTS") {
            throw new Error("Smart wallet already deployed for this user");
        }
        if (errorCode === "SMART_WALLET_CREATION_FAILED") {
            throw new Error("Failed to create smart wallet");
        }
        console.error("Error in createSmartWalletForExisting:", errorMessage || error);
        throw error;
    }
}
async function revokeWallet(arg) {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/wallet/revoke", arg);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_REQUIRED_FIELD") {
            throw new Error("userSub is required in request body");
        }
        if (errorCode === "WALLET_NOT_FOUND") {
            throw new Error("Wallet not found for this user");
        }
        if (errorCode === "WALLET_ALREADY_REVOKED") {
            throw new Error("Wallet is already revoked");
        }
        if (errorCode === "WALLET_REVOCATION_FAILED") {
            throw new Error("Failed to revoke wallet");
        }
        console.error("Error in revokeWallet:", errorMessage || error);
        throw error;
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
