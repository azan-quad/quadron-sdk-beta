"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbt = void 0;
const apiClient_1 = require("../apiClient");
async function mintSbt(arg) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/mint", arg);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_REQUIRED_FIELD") {
            throw new Error("userSub is required");
        }
        if (errorCode === "SBT_ALREADY_EXISTS") {
            throw new Error("User already owns an active SBT");
        }
        if (errorCode === "WALLET_NOT_FOUND") {
            throw new Error("Wallet not found for this user");
        }
        if (errorCode === "WALLET_REVOKED") {
            throw new Error("Cannot mint SBT for revoked wallet");
        }
        if (errorCode === "INTERNAL_SERVER_ERROR" && ((_g = (_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.tokenId)) {
            throw new Error("Minted on-chain but failed to save in DB. Please contact support.");
        }
        console.error("Error in mintSbt:", errorMessage || error);
        throw error;
    }
}
async function revokeSbt(arg) {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/revoke", arg);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_REQUIRED_FIELD") {
            throw new Error("userSub is required");
        }
        if (errorCode === "SBT_NOT_FOUND") {
            throw new Error("No SBT found for this user");
        }
        if (errorCode === "SBT_ALREADY_REVOKED") {
            throw new Error("SBT is already revoked");
        }
        console.error("Error in revokeSbt:", errorMessage || error);
        throw error;
    }
}
async function getMySbt() {
    var _a, _b;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get("/sbt/me");
        const sbt = res.data.data;
        if (!sbt) {
            return null;
        }
        if (sbt.revoked) {
            console.warn("SBT is revoked:", sbt);
            return sbt;
        }
        return sbt;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        if (errorCode === "SBT_NOT_FOUND") {
            return null;
        }
        console.error("Error in getMySbt:", error);
        throw error;
    }
}
async function getSbtBySub(userSub) {
    var _a, _b;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/user", { userSub });
        const sbt = res.data.data;
        if (!sbt) {
            return null;
        }
        if (sbt.revoked) {
            console.warn("SBT is revoked:", sbt);
            return sbt;
        }
        return sbt;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        if (errorCode === "MISSING_REQUIRED_FIELD") {
            throw new Error("userSub is required");
        }
        if (errorCode === "SBT_NOT_FOUND") {
            return null;
        }
        console.error("Error in getSbtBySub:", error);
        throw error;
    }
}
async function updateSbtMetadata(updates) {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.patch("/sbt/update", updates);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "MISSING_REQUIRED_FIELD") {
            throw new Error("userSub and updates object are required");
        }
        if (errorCode === "INVALID_REQUEST_DATA") {
            throw new Error("No valid identity fields provided for update");
        }
        if (errorCode === "SBT_NOT_FOUND") {
            throw new Error("SBT not found for update");
        }
        console.error("Error in updateSbtMetadata:", errorMessage || error);
        throw error;
    }
}
async function getPublicSbtMetadata(tokenId) {
    var _a, _b, _c, _d;
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/token/${tokenId}`);
        return res.data.data;
    }
    catch (error) {
        const errorCode = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code;
        const errorMessage = (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message;
        if (errorCode === "SBT_METADATA_NOT_FOUND") {
            throw new Error("SBT metadata not found");
        }
        console.error("Error in getPublicSbtMetadata:", errorMessage || error);
        throw error;
    }
}
exports.sbt = {
    mintSbt,
    revokeSbt,
    getMySbt,
    getSbtBySub,
    updateSbtMetadata,
    getPublicSbtMetadata,
};
