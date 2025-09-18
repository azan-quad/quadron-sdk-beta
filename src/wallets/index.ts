import { getApiClient } from "../apiClient";
import {
  CreateSmartWalletForExistingRes,
  CreateWalletAndMintSbtReq,
  CreateWalletAndMintSbtRes,
  CreateWalletReq,
  CreateWalletRes,
  GetWalletRes,
  RecoverWalletRes,
} from "../interfaces";
import { sbt } from "../sbt";

async function getWallet(): Promise<GetWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet");
    return res.data;
  } catch (error) {
    console.error("Error in getWallet:", error);
    return null;
  }
}

async function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/create", arg);
    return res.data;
  } catch (error) {
    console.error("Error in createWallet:", error);
    return null;
  }
}

async function recoverWallet(): Promise<RecoverWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post(`/wallet/recover`);
    return res.data;
  } catch (error) {
    console.error("Error in recoverWallet:", error);
    return null;
  }
}

async function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/smart");
    return res.data;
  } catch (error) {
    console.error("Error in createSmartWalletForExisting:", error);
    return null;
  }
}

async function createWalletAndMintSbt(arg: CreateWalletAndMintSbtReq): Promise<CreateWalletAndMintSbtRes> {
  try {
    const wallet = await createWallet({ withSmartWallet: arg.withSmartWallet });
    let mintedToken;
    if (arg.mintSBT) {
      mintedToken = await sbt.mintSbt(arg);
    }
    return { wallet, mintedToken };
  } catch (error) {
    console.error("Error in createWalletAndMintSbt:", error);
    return { wallet: null, mintedToken: null };
  }
}

export const wallet = {
  getWallet,
  createWallet,
  recoverWallet,
  createWalletAndMintSbt,
  createSmartWalletForExisting,
};
