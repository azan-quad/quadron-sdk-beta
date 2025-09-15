"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbt = void 0;
const apiClient_1 = require("../apiClient");
async function mintSbt(userAddress, name, description, image, attributes) {
    try {
        if (!userAddress)
            throw new Error("userAddress is required");
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/mint", { userAddress, name, description, image, attributes });
        return res.data;
    }
    catch (error) {
        console.error("Error in mintSbt:", error);
        return null;
    }
}
async function revokeSbt(tokenId) {
    try {
        if (tokenId === undefined || tokenId === null) {
            throw new Error("tokenId is required");
        }
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/revoke", { tokenId });
        return res.data;
    }
    catch (error) {
        console.error("Error in revokeSbt:", error);
        return null;
    }
}
async function hasSbt(userAddress) {
    try {
        if (!userAddress)
            throw new Error("userAddress is required");
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/exists/${encodeURIComponent(userAddress)}`);
        return res.data;
    }
    catch (error) {
        console.error("Error in hasSbt:", error);
        return null;
    }
}
async function getSbtMetadata(tokenId) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/metadata/${tokenId}`);
        return res.data;
    }
    catch (error) {
        console.error("Error in getSbtMetadata:", error);
        return null;
    }
}
async function updateSbtMetadata(tokenId, updates) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.put(`/sbt/updateMetadata/${tokenId}`, updates);
        return res.data;
    }
    catch (error) {
        console.error("Error in updateSbtMetadata:", error);
        return null;
    }
}
exports.sbt = {
    mintSbt,
    revokeSbt,
    hasSbt,
    updateSbtMetadata,
    getSbtMetadata,
};
