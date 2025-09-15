import { getApiClient } from "../apiClient";
import { sbt } from "../sbt";

async function getWallet(cognitoSub: string): Promise<{
  cognitoSub: string;
  publicAddress: string;
  smartWalletAddress: string;
  isSmartWalletDeployed: boolean;
  revoked: boolean;
} | null> {
  const apiClient = getApiClient();
  const res = await apiClient.post("/wallet", { cognitoSub });
  return res.data;
}

async function createWallet(
  cognitoSub: string,
  withSmartWallet: boolean,
): Promise<{
  publicAddress: string;
  smartWalletAddress: string;
} | null> {
  const apiClient = getApiClient();
  const res = await apiClient.post("/wallet/create", { cognitoSub, withSmartWallet });
  return res.data;
}

async function recoverWallet(cognitoSub: string): Promise<{
  address: string;
  privateKey: string;
  mnemonic: string;
} | null> {
  const apiClient = getApiClient();
  const res = await apiClient.post(`/wallet/recover`, { cognitoSub });
  return res.data;
}

async function createSmartWalletForExisting(cognitoSub: string): Promise<{
  publicAddress: string;
  smartWalletAddress: string;
} | null> {
  const apiClient = getApiClient();
  const res = await apiClient.post("/wallet/smart", { cognitoSub });
  return res.data;
}

async function createWalletAndMintSbt({
  cognitoSub,
  withSmartWallet = true,
  mintSBT = true,
  name,
  description,
  image,
  attributes,
} : {
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
  const wallet = await createWallet(cognitoSub, withSmartWallet);
  let mintedToken;
  if (mintSBT) {
    mintedToken = await sbt.mintSbt(wallet!?.publicAddress, name, description, image, attributes);
  }
  return { wallet, mintedToken };
}

export const wallet = {
  getWallet,
  createWallet,
  recoverWallet,
  createWalletAndMintSbt,
  createSmartWalletForExisting,
};
