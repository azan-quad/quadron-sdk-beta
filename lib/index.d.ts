export * from "./interfaces";
import { QuadronSDKConfig, Quad } from "./interfaces";
export declare function initSDK(config: QuadronSDKConfig): Quad;
export declare function updateAccessToken(newToken: string): QuadronSDKConfig;
export declare function getSDKConfig(): QuadronSDKConfig | null;
export type { Quad } from "./interfaces";
