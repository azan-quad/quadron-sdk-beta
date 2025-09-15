"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbt = void 0;
const apiClient_1 = require("../apiClient");
async function mintSbt(userAddress, name, description, image, attributes) {
    if (!userAddress)
        throw new Error("userAddress is required");
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.post("/sbt/mint", { userAddress, name, description, image, attributes });
    return res.data;
}
async function revokeSbt(tokenId) {
    if (tokenId === undefined || tokenId === null) {
        throw new Error("tokenId is required");
    }
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.post("/sbt/revoke", { tokenId });
    return res.data;
}
async function hasSbt(userAddress) {
    if (!userAddress)
        throw new Error("userAddress is required");
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.get(`/sbt/exists/${encodeURIComponent(userAddress)}`);
    return res.data;
}
async function getSbtMetadata(tokenId) {
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.get(`/sbt/metadata/${tokenId}`);
    return res.data;
}
async function updateSbtMetadata(tokenId, updates) {
    const apiClient = (0, apiClient_1.getApiClient)();
    const res = await apiClient.put(`/sbt/updateMetadata/${tokenId}`, updates);
    return res.data;
}
exports.sbt = {
    mintSbt,
    revokeSbt,
    hasSbt,
    updateSbtMetadata,
    getSbtMetadata,
};
