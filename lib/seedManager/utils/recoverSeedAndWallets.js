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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverSeedAndWallets = recoverSeedAndWallets;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const bip39 = __importStar(require("bip39"));
const ed25519_hd_key_1 = require("ed25519-hd-key");
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
const bs58_1 = __importDefault(require("bs58"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
async function recoverSeedAndWallets({ kmsKeyId, bucketName, objectKey, secretName, ethereumDerivationPath, solanaDerivationPath, }) {
    const kms = new aws_sdk_1.default.KMS();
    const s3 = new aws_sdk_1.default.S3();
    const secretsManager = new aws_sdk_1.default.SecretsManager();
    const s3Data = await s3.getObject({ Bucket: bucketName, Key: objectKey }).promise();
    const s3Json = JSON.parse(s3Data.Body.toString());
    const firstHalf = s3Json.encryptedSeedPart;
    const secretData = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const secretJson = JSON.parse(secretData.SecretString);
    const secondHalf = secretJson.encryptedSeedPart;
    const fullBase64 = firstHalf + secondHalf;
    const ciphertextBuffer = Buffer.from(fullBase64, "base64");
    const decrypted = await kms.decrypt({
        CiphertextBlob: ciphertextBuffer,
        KeyId: kmsKeyId,
    }).promise();
    const mnemonic = decrypted.Plaintext.toString();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const ethWallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(seed)
        .derivePath(ethereumDerivationPath)
        .getWallet();
    const ethAddress = "0x" + ethWallet.getAddress().toString("hex");
    const ethPrivateKey = ethWallet.getPrivateKey().toString("hex");
    const derived = (0, ed25519_hd_key_1.derivePath)(solanaDerivationPath, seed.toString("hex"));
    const keyPair = tweetnacl_1.default.sign.keyPair.fromSeed(derived.key);
    const solAddress = bs58_1.default.encode(keyPair.publicKey);
    const solPrivateKey = Buffer.from(keyPair.secretKey).toString("hex");
    return {
        ethereum: {
            address: ethAddress,
            privateKey: ethPrivateKey,
        },
        solana: {
            address: solAddress,
            privateKey: solPrivateKey,
        },
    };
}
