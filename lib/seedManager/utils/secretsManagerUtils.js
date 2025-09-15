"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeInSecretsManager = storeInSecretsManager;
async function storeInSecretsManager(secretsManager, secretName, secretValue) {
    const json = JSON.stringify(secretValue);
    try {
        await secretsManager.createSecret({
            Name: secretName,
            SecretString: json,
        }).promise();
    }
    catch (err) {
        if (err.code === "ResourceExistsException") {
            await secretsManager.putSecretValue({
                SecretId: secretName,
                SecretString: json,
            }).promise();
        }
        else {
            throw err;
        }
    }
}
