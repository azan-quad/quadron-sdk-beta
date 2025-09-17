import { getApiClient } from "../apiClient";
import { sbt } from "../sbt";

async function getWallet({ cognitoSub }: { cognitoSub: string }): Promise<{
  cognitoSub: string;
  publicAddress: string;
  smartWalletAddress: string;
  isSmartWalletDeployed: boolean;
  revoked: boolean;
} | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet", { cognitoSub });
    return res.data;
  } catch (error) {
    console.error("Error in getWallet:", error);
    return null;
  }
}

async function createWallet({
  cognitoSub,
  withSmartWallet,
}: {
  cognitoSub: string;
  withSmartWallet: boolean;
}): Promise<{
  publicAddress: string;
  smartWalletAddress: string;
} | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/create", { cognitoSub, withSmartWallet });
    return res.data;
  } catch (error) {
    console.error("Error in createWallet:", error);
    return null;
  }
}

async function recoverWallet({ cognitoSub }: { cognitoSub: string }): Promise<{
  address: string;
  privateKey: string;
  mnemonic: string;
} | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post(`/wallet/recover`, { cognitoSub });
    return res.data;
  } catch (error) {
    console.error("Error in recoverWallet:", error);
    return null;
  }
}

async function createSmartWalletForExisting(cognitoSub: { cognitoSub: string }): Promise<{
  publicAddress: string;
  smartWalletAddress: string;
} | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/smart", { cognitoSub });
    return res.data;
  } catch (error) {
    console.error("Error in createSmartWalletForExisting:", error);
    return null;
  }
}

async function createWalletAndMintSbt({
  cognitoSub,
  withSmartWallet = true,
  mintSBT = true,
  name,
  description,
  image,
  attributes,
}: {
  cognitoSub: string;
  withSmartWallet: boolean;
  mintSBT: boolean;
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
}): Promise<{
  wallet: {
    publicAddress: string;
    smartWalletAddress: string;
  } | null;
  mintedToken: { tokenId: number; owner: string; metadata: any } | null;
} | null> {
  try {
    const wallet = await createWallet({ cognitoSub, withSmartWallet });
    let mintedToken;
    if (mintSBT) {
      mintedToken = await sbt.mintSbt({cognitoSub, name, description, image, attributes});
    }
    return { wallet, mintedToken };
  } catch (error) {
    console.error("Error in createWalletAndMintSbt:", error);
    return null;
  }
}

export const wallet = {
  getWallet,
  createWallet,
  recoverWallet,
  createWalletAndMintSbt,
  createSmartWalletForExisting,
};
