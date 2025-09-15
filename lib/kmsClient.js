"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKMSClient = initKMSClient;
exports.getKMS = getKMS;
const client_kms_1 = require("@aws-sdk/client-kms");
let kms = null;
function initKMSClient(config) {
    kms = new client_kms_1.KMSClient(config);
}
function getKMS() {
    if (!kms) {
        throw new Error("KMS client is not initialized. Call initKMSClient() first.");
    }
    return kms;
}
