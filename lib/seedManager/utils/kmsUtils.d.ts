import AWS from "aws-sdk";
export declare function getOrCreateKmsKey(kms: AWS.KMS, providedKeyId?: string): Promise<string>;
export declare function encryptMnemonic(kms: AWS.KMS, keyId: string, mnemonic: string): Promise<string>;
export declare function decryptMnemonic(kms: AWS.KMS, base64Ciphertext: string): Promise<string>;
