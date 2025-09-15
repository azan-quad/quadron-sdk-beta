import AWS from "aws-sdk";
export declare function storeInSecretsManager(secretsManager: AWS.SecretsManager, secretName: string, secretValue: Record<string, any>): Promise<void>;
