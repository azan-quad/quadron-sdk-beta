export * from "./interfaces";
import { wallet } from "./wallets";
import { sbt } from "./sbt";
import { QuadronSDKConfig, Quad } from "./interfaces";

let sdkConfig: QuadronSDKConfig | null = null;

export function initSDK(config: QuadronSDKConfig): Quad {
  if (!config || !config.API_BASE_URL) {
    throw new Error("API_BASE_URL is required to initialize the SDK");
  }
  if (config.isClient && !config.ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is required to initialize the SDK on client side");
  }

  if (!config.isClient && !config.API_KEY) {
    throw new Error("API_KEY is required to initialize the SDK on server side");
  }

  sdkConfig = config;

  return {
    wallets: {
      get: wallet.getWallet,
      getBySub: wallet.getWalletBySub,
      create: wallet.createWallet,
      recover: wallet.recoverWallet,
      smart: wallet.createSmartWalletForExisting,
      revoke: wallet.revokeWallet,
    },
    sbt: {
      mint: sbt.mintSbt,
      revoke: sbt.revokeSbt,
      getMySbt: sbt.getMySbt,
      getSbtBySub: sbt.getSbtBySub,
      update: sbt.updateSbtMetadata,
      getPublicMetadata: sbt.getPublicSbtMetadata,
    },
  };
}

export function updateAccessToken(newToken: string) {
  if (!sdkConfig) {
    throw new Error("SDK not initialized. Please call initSDK first.");
  }
  if (!sdkConfig.isClient) {
    throw new Error("updateAccessToken can only be used in client mode");
  }
  sdkConfig.ACCESS_TOKEN = newToken;
  return sdkConfig;
}

export function getSDKConfig(): QuadronSDKConfig | null {
  return sdkConfig;
}

export type { Quad } from "./interfaces";
