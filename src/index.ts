
export * from "./interfaces";
import { wallet } from "./wallets";
import { sbt } from "./sbt";
import { QuadronSDKConfig } from "./interfaces";

let sdkConfig: QuadronSDKConfig | null = null;

export function initSDK(config: QuadronSDKConfig) {
  if (!config || !config.API_BASE_URL) {
    throw new Error("API_BASE_URL is required to initialize the SDK");
  }
  if (config.isClient && !config.COGNITO_JWT) {
    throw new Error("COGNITO_JWT is required to initialize the SDK on client side");
  }
  
  if (!config.isClient && !config.API_KEY) {
    throw new Error("API_KEY is required to initialize the SDK on server side");
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
