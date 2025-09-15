import { getApiClient } from "../apiClient";

async function getWallet(cognitoSub: string): Promise<
  | {
      cognitoSub: string;
      publicAddress: string;
      smartWalletAddress: string;
      isSmartWalletDeployed: boolean;
      revoked: boolean;
    }
  | any
> {
  const apiClient = getApiClient();
  const res = await apiClient.post("/wallet", { cognitoSub });
  return res.data;
}

async function createWallet(
  cognitoSub: string,
  withSmartWallet: boolean,
): Promise<
  | {
      publicAddress: string;
      smartWalletAddress: string;
    }
  | any
> {
  const apiClient = getApiClient();
  const res = await apiClient.post("/wallet/create", { cognitoSub, withSmartWallet });
  return res.data;
}

async function recoverWallet(cognitoSub: string): Promise<
  | {
      address: string;
      privateKey: string;
      mnemonic: string;
    }
  | any
> {
  const apiClient = getApiClient();
  const res = await apiClient.post(`/wallet/recover`, { cognitoSub });
  return res.data;
}

async function createSmartWalletForExisting(cognitoSub: string): Promise<
  | {
      publicAddress: string;
      smartWalletAddress: string;
    }
  | any
> {
  const apiClient = getApiClient();
  const res = await apiClient.post("/wallet/smart", { cognitoSub });
  return res.data;
}

export const wallet = {
  getWallet,
  createWallet,
  recoverWallet,
  createSmartWalletForExisting,
};
