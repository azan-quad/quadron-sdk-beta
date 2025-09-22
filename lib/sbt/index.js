"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbt = void 0;
const apiClient_1 = require("../apiClient");
async function mintSbt(arg) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/mint", arg);
        return res.data;
    }
    catch (error) {
        console.error("Error in mintSbt:", error);
        return null;
    }
}
async function revokeSbt(arg) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.post("/sbt/revoke", arg);
        return res.data;
    }
    catch (error) {
        console.error("Error in revokeSbt:", error);
        return null;
    }
}
async function getMySbt() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get("/sbt/me");
        return res.data;
    }
    catch (error) {
        console.error("Error in getMySbt:", error);
        return null;
    }
}
async function getSbtByAccessId(cognitoSub) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/user?cognitoSub=${encodeURIComponent(cognitoSub)}`);
        return res.data;
    }
    catch (error) {
        console.error("Error in getSbtByCognitoSub:", error);
        return null;
    }
}
async function updateSbtMetadata(updates) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.patch("/sbt/update", updates);
        return res.data;
    }
    catch (error) {
        console.error("Error in updateSbtMetadata:", error);
        return null;
    }
}
async function getPublicSbtMetadata(tokenId) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/token/${tokenId}`);
        return res.data;
    }
    catch (error) {
        console.error("Error in getPublicSbtMetadata:", error);
        return null;
    }
}
exports.sbt = {
    mintSbt,
    revokeSbt,
    getMySbt,
    getSbtByAccessId,
    updateSbtMetadata,
    getPublicSbtMetadata,
};
