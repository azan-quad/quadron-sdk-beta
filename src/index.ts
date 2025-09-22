export * from "./interfaces";
import { wallet } from "./wallets";
import { sbt } from "./sbt";
import { QuadronSDKConfig } from "./interfaces";

interface Quad {
  wallets: {
    get: typeof wallet.getWallet;
    create: typeof wallet.createWallet;
    recover: typeof wallet.recoverWallet;
    smart: typeof wallet.createSmartWalletForExisting;
    revoke: typeof wallet.revokeWallet;
    createWalletAndMintSbt: typeof wallet.createWalletAndMintSbt;
  };
  sbt: {
    mint: typeof sbt.mintSbt;
    revoke: typeof sbt.revokeSbt;
    getMySbt: typeof sbt.getMySbt;
    getSbtById: typeof sbt.getSbtByAccessId;
    update: typeof sbt.updateSbtMetadata;
    getPublicMetadata: typeof sbt.getPublicSbtMetadata;
  };
}

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

  const finalConfig = {
    API_BASE_URL: config.API_BASE_URL,
    API_KEY: config.API_KEY,
    COGNITO_JWT: config.COGNITO_JWT,
    isClient: config.isClient,
  };

  console.log("🔧 initSDK config:", {
    baseUrl: finalConfig.API_BASE_URL,
    apiKey: !!finalConfig.API_KEY,
    jwtPresent: !!finalConfig.COGNITO_JWT,
    jwtSnippet: finalConfig.COGNITO_JWT ? finalConfig.COGNITO_JWT.substring(0, 20) + "..." : null,
    isClient: finalConfig.isClient,
  });

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

export function getSDKConfig(): QuadronSDKConfig | null {
  return sdkConfig;
}
