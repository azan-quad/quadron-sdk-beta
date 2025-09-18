"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbt = void 0;
const apiClient_1 = require("../apiClient");
async function hasSbt() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/exists`);
        return res.data;
    }
    catch (error) {
        console.error("Error in hasSbt:", error);
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
async function getSbtMetadata() {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.get(`/sbt/metadata`);
        return res.data;
    }
    catch (error) {
        console.error("Error in getSbtMetadata:", error);
        return null;
    }
}
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
async function updateSbtMetadata(updates) {
    try {
        const apiClient = (0, apiClient_1.getApiClient)();
        const res = await apiClient.put(`/sbt/updateMetadata`, updates);
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
