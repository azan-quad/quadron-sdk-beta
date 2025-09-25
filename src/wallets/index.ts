import { getApiClient } from "../apiClient";
import {
  GetWalletBySubReq,
  CreateSmartWalletForExistingRes,
  CreateWalletAndMintSbtReq,
  CreateWalletAndMintSbtRes,
  CreateWalletReq,
  CreateWalletRes,
  GetWalletRes,
  RecoverWalletRes,
  RevokeWalletReq,
  RevokeWalletRes,
  MintSbtReq,
  MintSbtRes,
} from "../interfaces";

// GET /wallet/
async function getWallet(): Promise<GetWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get("/wallet/");
    return res.data;
  } catch (error) {
    console.error("Error in getWallet:", error);
    return null;
  }
}

async function getWalletBySub(arg: GetWalletBySubReq): Promise<GetWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get("/wallet/getbysub", {
      params: arg,
    });
    return res.data;
  } catch (error) {
    console.error("Error in getWalletBySub:", error);
    return null;
  }
}

// POST /wallet/create
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

// POST /wallet/recover
async function recoverWallet(): Promise<RecoverWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/recover");
    return res.data;
  } catch (error) {
    console.error("Error in recoverWallet:", error);
    return null;
  }
}

// POST /wallet/smart
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

// POST /wallet/revoke
async function revokeWallet(arg: RevokeWalletReq): Promise<RevokeWalletRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/revoke", arg);
    return res.data;
  } catch (error) {
    console.error("Error in revokeWallet:", error);
    return null;
  }
}

export const wallet = {
  getWallet,
  getWalletBySub,
  createWallet,
  recoverWallet,
  createSmartWalletForExisting,
  revokeWallet,
};
