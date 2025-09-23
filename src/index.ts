export * from "./interfaces";
import { wallet } from "./wallets";
import { sbt } from "./sbt";
import { QuadronSDKConfig, Quad } from "./interfaces";

let sdkConfig: QuadronSDKConfig | null = null;

export function initSDK(config: QuadronSDKConfig): Quad {
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
      revoke: wallet.revokeWallet,
      createWalletAndMintSbt: wallet.createWalletAndMintSbt,
    },
    sbt: {
      mint: sbt.mintSbt,
      revoke: sbt.revokeSbt,
      getMySbt: sbt.getMySbt,
      getSbtById: sbt.getSbtByAccessId,
      update: sbt.updateSbtMetadata,
      getPublicMetadata: sbt.getPublicSbtMetadata,
    },
  };
}
// make Upgdate Access Token funtion in here

export function getSDKConfig(): QuadronSDKConfig | null {
  return sdkConfig;
}

export type { Quad } from "./interfaces";
