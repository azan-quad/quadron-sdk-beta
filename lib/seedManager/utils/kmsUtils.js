"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateKmsKey = getOrCreateKmsKey;
exports.encryptMnemonic = encryptMnemonic;
exports.decryptMnemonic = decryptMnemonic;
async function getOrCreateKmsKey(kms, providedKeyId) {
    if (providedKeyId) {
        try {
            const { KeyMetadata } = await kms.describeKey({ KeyId: providedKeyId }).promise();
            if ((KeyMetadata === null || KeyMetadata === void 0 ? void 0 : KeyMetadata.KeyManager) === "CUSTOMER" &&
                (KeyMetadata === null || KeyMetadata === void 0 ? void 0 : KeyMetadata.Enabled) &&
                (KeyMetadata === null || KeyMetadata === void 0 ? void 0 : KeyMetadata.KeyState) === "Enabled") {
                return providedKeyId;
            }
            else {
                throw new Error("Provided KMS key is not usable (disabled or not customer-managed).");
            }
        }
        catch (err) {
            throw new Error(`Invalid provided KMS KeyId: ${providedKeyId}. ${err.message}`);
        }
    }
    const { KeyMetadata } = await kms
        .createKey({
        Description: "Auto-generated KMS key for seed encryption",
        KeyUsage: "ENCRYPT_DECRYPT",
        CustomerMasterKeySpec: "SYMMETRIC_DEFAULT",
        Origin: "AWS_KMS",
    })
        .promise();
    const newKeyId = KeyMetadata === null || KeyMetadata === void 0 ? void 0 : KeyMetadata.KeyId;
    if (!newKeyId) {
        throw new Error("Failed to create KMS key.");
    }
    await kms
        .createAlias({
        AliasName: `alias/AutoWalletKey-${Date.now()}`,
        TargetKeyId: newKeyId,
    })
        .promise()
        .catch(() => {
    });
    return newKeyId;
}
async function encryptMnemonic(kms, keyId, mnemonic) {
    const { CiphertextBlob } = await kms
        .encrypt({
        KeyId: keyId,
        Plaintext: mnemonic,
    })
        .promise();
    if (!CiphertextBlob) {
        throw new Error("Failed to encrypt mnemonic.");
    }
    return CiphertextBlob.toString("base64");
}
async function decryptMnemonic(kms, base64Ciphertext) {
    const buffer = Buffer.from(base64Ciphertext, "base64");
    const { Plaintext } = await kms
        .decrypt({
        CiphertextBlob: buffer,
    })
        .promise();
    if (!Plaintext) {
        throw new Error("Failed to decrypt mnemonic.");
    }
    return Plaintext.toString("utf8");
}
