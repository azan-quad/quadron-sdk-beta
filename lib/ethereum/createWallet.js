"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEthereumWallet = createEthereumWallet;
const ethers_1 = require("ethers");
const kmsClient_1 = require("../kmsClient");
const client_kms_1 = require("@aws-sdk/client-kms");
const secrets = __importStar(require("secrets.js-grempe"));
async function createEthereumWallet(orgId, userId) {
    const kms = (0, kmsClient_1.getKMS)();
    const encryptionContext = { orgId, userId };
    const wallet = ethers_1.Wallet.createRandom();
    const privateKeyHex = wallet.privateKey.slice(2);
    const shares = secrets.share(privateKeyHex, 3, 3);
    const [shard1, shard2, shard3] = shares;
    const kmsResp = await kms.send(new client_kms_1.CreateKeyCommand({
        Description: "Ethereum Wallet Shard Key",
        KeyUsage: "ENCRYPT_DECRYPT",
        CustomerMasterKeySpec: "SYMMETRIC_DEFAULT",
    }));
    const kmsKeyId = kmsResp.KeyMetadata.KeyId;
    const encryptedShard1 = Buffer.from((await kms.send(new client_kms_1.EncryptCommand({
        KeyId: kmsKeyId,
        Plaintext: Buffer.from(shard1, "utf8"),
    }))).CiphertextBlob).toString("base64");
    const encryptedShard3 = Buffer.from((await kms.send(new client_kms_1.EncryptCommand({
        KeyId: kmsKeyId,
        Plaintext: Buffer.from(shard3, "utf8"),
        EncryptionContext: encryptionContext,
    }))).CiphertextBlob).toString("base64");
    return {
        orgId,
        userId,
        publicAddress: wallet.address,
        kmsKeyId,
        encryptedShard1,
        encryptedShard3,
        shard2,
    };
}
