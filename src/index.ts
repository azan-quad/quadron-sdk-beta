import { wallet } from "./wallets";
import { sbt } from "./sbt";

export interface QuadronSDKConfig {
  API_BASE_URL: string;
  API_KEY?: string;
}

let sdkConfig: QuadronSDKConfig | null = null;

export function initSDK(config: QuadronSDKConfig) {
  if (!config || !config.API_BASE_URL) {
    throw new Error("API_BASE_URL is required to initialize the SDK");
  }
  sdkConfig = config;
  return {
    wallets: {
      get: wallet.getWallet,
      create: wallet.createWallet,
      recover: wallet.recoverWallet,
      smart: wallet.createSmartWalletForExisting,
      createWalletAndMintSbt: wallet.createWalletAndMintSbt,
    },
    sbt: {
      mint: sbt.mintSbt,
      revoke: sbt.revokeSbt,
      exists: sbt.hasSbt,
      fetch: sbt.getSbtMetadata,
      update: sbt.updateSbtMetadata,
    },
  };
}

export function getSDKConfig(): QuadronSDKConfig | null {
  return sdkConfig;
}
