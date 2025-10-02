import { getApiClient } from "../apiClient";
import {
  GetWalletBySubReq,
  CreateSmartWalletForExistingRes,
  CreateWalletReq,
  CreateWalletRes,
  GetWalletRes,
  RecoverWalletRes,
  RevokeWalletReq,
  RevokeWalletRes,
} from "../interfaces";

// wallet.get
async function getWallet(): Promise<GetWalletRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get("/wallet/");
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_USER_SUB") {
      throw new Error("User authentication required");
    }
    if (errorCode === "WALLET_NOT_FOUND") {
      throw new Error("Wallet not found for this user");
    }
    if (errorCode === "WALLET_RETRIEVAL_FAILED") {
      throw new Error("Failed to retrieve wallet information");
    }
    console.error("Error in getWallet:", errorMessage || error);
    throw error;
  }
}
// wallet.getBySub
async function getWalletBySub(arg: GetWalletBySubReq): Promise<GetWalletRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/getbysub", arg);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_REQUIRED_FIELD") {
      throw new Error("userSub is required in request body");
    }
    if (errorCode === "WALLET_NOT_FOUND") {
      throw new Error("Wallet not found for this user");
    }
    if (errorCode === "WALLET_RETRIEVAL_FAILED") {
      throw new Error("Failed to retrieve wallet information");
    }
    console.error("Error in getWalletBySub:", errorMessage || error);
    throw error;
  }
}

// wallet.create
async function createWallet(arg: CreateWalletReq): Promise<CreateWalletRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/create", arg);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_USER_SUB") {
      throw new Error("User authentication required");
    }
    if (errorCode === "WALLET_ALREADY_EXISTS") {
      throw new Error("Wallet already exists for this user");
    }
    if (errorCode === "WALLET_CREATION_FAILED") {
      throw new Error("Failed to create wallet");
    }
    console.error("Error in createWallet:", errorMessage || error);
    throw error;
  }
}

// wallet.recover
async function recoverWallet(): Promise<RecoverWalletRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/recover");
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_USER_SUB") {
      throw new Error("User authentication required");
    }
    if (errorCode === "WALLET_NOT_FOUND") {
      throw new Error("Wallet not found for this user");
    }
    if (errorCode === "WALLET_RECOVERY_FAILED") {
      throw new Error("Failed to recover wallet");
    }
    console.error("Error in recoverWallet:", errorMessage || error);
    throw error;
  }
}

// wallet.smart
async function createSmartWalletForExisting(): Promise<CreateSmartWalletForExistingRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/smart");
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_USER_SUB") {
      throw new Error("User authentication required");
    }
    if (errorCode === "BASE_WALLET_NOT_FOUND") {
      throw new Error("Base wallet not found for smart wallet creation");
    }
    if (errorCode === "SMART_WALLET_ALREADY_EXISTS") {
      throw new Error("Smart wallet already deployed for this user");
    }
    if (errorCode === "SMART_WALLET_CREATION_FAILED") {
      throw new Error("Failed to create smart wallet");
    }
    console.error("Error in createSmartWalletForExisting:", errorMessage || error);
    throw error;
  }
}

// wallet.revoke
async function revokeWallet(arg: RevokeWalletReq): Promise<RevokeWalletRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/wallet/revoke", arg);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_REQUIRED_FIELD") {
      throw new Error("userSub is required in request body");
    }
    if (errorCode === "WALLET_NOT_FOUND") {
      throw new Error("Wallet not found for this user");
    }
    if (errorCode === "WALLET_ALREADY_REVOKED") {
      throw new Error("Wallet is already revoked");
    }
    if (errorCode === "WALLET_REVOCATION_FAILED") {
      throw new Error("Failed to revoke wallet");
    }
    console.error("Error in revokeWallet:", errorMessage || error);
    throw error;
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
