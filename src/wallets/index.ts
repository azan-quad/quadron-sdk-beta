import { getApiClient } from "../apiClient";
import {
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

async function createWalletAndMintSbt(arg: CreateWalletAndMintSbtReq): Promise<CreateWalletAndMintSbtRes | null> {
  try {
    const apiClient = getApiClient();

    // Step 1: create wallet
    const walletRes = await apiClient.post<CreateWalletRes>("/wallet/create", {
      withSmartWallet: arg.withSmartWallet,
      cognitoSub: arg.cognitoSub,
    });

    let sbtRes: MintSbtRes | undefined = undefined;

    // Step 2: optionally mint SBT
    if (arg.mintSbt) {
      const mintReq: MintSbtReq = { cognitoSub: arg.cognitoSub };
      const mintRes = await apiClient.post<MintSbtRes>("/sbt/mint", mintReq);
      sbtRes = mintRes.data;
    }

    return {
      wallet: walletRes.data,
      sbt: sbtRes,
    };
  } catch (error) {
    console.error("Error in createWalletAndMintSbt:", error);
    return null;
  }
}

export const wallet = {
  getWallet,
  createWallet,
  recoverWallet,
  createSmartWalletForExisting,
  revokeWallet,
  createWalletAndMintSbt,
};
