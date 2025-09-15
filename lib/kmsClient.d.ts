import { KMSClient, KMSClientConfig } from "@aws-sdk/client-kms";
export declare function initKMSClient(config: KMSClientConfig): void;
export declare function getKMS(): KMSClient;
