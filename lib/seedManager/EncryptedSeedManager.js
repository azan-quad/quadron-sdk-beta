"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptedSeedManager = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const kmsUtils_1 = require("./utils/kmsUtils");
const s3Utils_1 = require("./utils/s3Utils");
const secretsManagerUtils_1 = require("./utils/secretsManagerUtils");
const mnemonicUtils_1 = require("./utils/mnemonicUtils");
const recoverSeedAndWallets_1 = require("./utils/recoverSeedAndWallets");
class EncryptedSeedManager {
    constructor(bucket, objectKey, secretName) {
        this.bucket = bucket;
        this.objectKey = objectKey;
        this.secretName = secretName;
        this.kms = new aws_sdk_1.default.KMS();
        this.s3 = new aws_sdk_1.default.S3();
        this.secretsManager = new aws_sdk_1.default.SecretsManager();
    }
    async generateAndStoreSeed(providedKmsKeyId) {
        const { mnemonic } = await (0, mnemonicUtils_1.generateSeedAndKeys)();
        const kmsKeyId = await (0, kmsUtils_1.getOrCreateKmsKey)(this.kms, providedKmsKeyId);
        const encryptedBase64 = await (0, kmsUtils_1.encryptMnemonic)(this.kms, kmsKeyId, mnemonic);
        const half = Math.floor(encryptedBase64.length / 2);
        const firstHalf = encryptedBase64.slice(0, half);
        const secondHalf = encryptedBase64.slice(half);
        await (0, s3Utils_1.ensureBucketExists)(this.s3, this.bucket);
        await (0, s3Utils_1.storeInS3)(this.s3, this.bucket, this.objectKey, {
            part: "first",
            encryptedSeedPart: firstHalf,
            timestamp: new Date().toISOString(),
        });
        await (0, secretsManagerUtils_1.storeInSecretsManager)(this.secretsManager, this.secretName, {
            part: "second",
            encryptedSeedPart: secondHalf,
            timestamp: new Date().toISOString(),
        });
        return {
            kmsKeyId,
            s3Bucket: this.bucket,
            s3Key: this.objectKey,
            secretName: this.secretName,
        };
    }
    async recoverWallets(params) {
        return await (0, recoverSeedAndWallets_1.recoverSeedAndWallets)({
            kmsKeyId: params.kmsKeyId,
            bucketName: this.bucket,
            objectKey: this.objectKey,
            secretName: this.secretName,
            ethereumDerivationPath: params.ethPath,
            solanaDerivationPath: params.solPath,
        });
    }
}
exports.EncryptedSeedManager = EncryptedSeedManager;
