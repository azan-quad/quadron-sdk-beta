import { getApiClient } from "../apiClient";
import {
  MintSbtReq,
  MintSbtRes,
  RevokeSbtReq,
  RevokeSbtRes,
  GetSbtRes,
  UpdateSbtMetadataReq,
  UpdateSbtMetadataRes,
  PublicSbtMetadata,
} from "../interfaces";
//sbt.mint
async function mintSbt(arg: MintSbtReq): Promise<MintSbtRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/mint", arg);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_REQUIRED_FIELD") {
      throw new Error("userSub is required");
    }
    if (errorCode === "SBT_ALREADY_EXISTS") {
      throw new Error("User already owns an active SBT");
    }
    if (errorCode === "WALLET_NOT_FOUND") {
      throw new Error("Wallet not found for this user");
    }
    if (errorCode === "WALLET_REVOKED") {
      throw new Error("Cannot mint SBT for revoked wallet");
    }
    if (errorCode === "INTERNAL_SERVER_ERROR" && error.response?.data?.data?.tokenId) {
      // Minted on-chain but DB save failed
      throw new Error("Internal server error");
    }
    console.error("Error in mintSbt:", errorMessage || error);
    throw error;
  }
}
//sbt.revoke
async function revokeSbt(arg: RevokeSbtReq): Promise<RevokeSbtRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/revoke", arg);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_REQUIRED_FIELD") {
      throw new Error("userSub is required");
    }
    if (errorCode === "SBT_NOT_FOUND") {
      throw new Error("No SBT found for this user");
    }
    if (errorCode === "SBT_ALREADY_REVOKED") {
      throw new Error("SBT is already revoked");
    }
    console.error("Error in revokeSbt:", errorMessage || error);
    throw error;
  }
}

// sbt.getMySbt
async function getMySbt(): Promise<GetSbtRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get("/sbt/me");

    const sbt = res.data.data;

    if (!sbt) {
      return null;
    }

    if (sbt.revoked) {
      console.warn("SBT is revoked:", sbt);
      return sbt;
    }

    return sbt;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode === "SBT_NOT_FOUND") {
      return null;
    }

    console.error("Error in getMySbt:", error);
    throw error;
  }
}
// sbt.getSbtBySub
async function getSbtBySub(userSub: string): Promise<GetSbtRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/user", { userSub });

    const sbt = res.data.data;

    if (!sbt) {
      return null;
    }

    if (sbt.revoked) {
      console.warn("SBT is revoked:", sbt);
      return sbt;
    }
    return sbt;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;

    if (errorCode === "MISSING_REQUIRED_FIELD") {
      throw new Error("userSub is required");
    }

    if (errorCode === "SBT_NOT_FOUND") {
      return null;
    }

    console.error("Error in getSbtBySub:", error);
    throw error;
  }
}

//sbt.update
async function updateSbtMetadata(updates: UpdateSbtMetadataReq): Promise<UpdateSbtMetadataRes> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.patch("/sbt/update", updates);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "MISSING_REQUIRED_FIELD") {
      throw new Error("userSub and updates object are required");
    }
    if (errorCode === "INVALID_REQUEST_DATA") {
      throw new Error("No valid identity fields provided for update");
    }
    if (errorCode === "SBT_NOT_FOUND") {
      throw new Error("SBT not found for update");
    }
    console.error("Error in updateSbtMetadata:", errorMessage || error);
    throw error;
  }
}
//sbt.getPublicMetadata
async function getPublicSbtMetadata(tokenId: number): Promise<PublicSbtMetadata> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/token/${tokenId}`);
    return res.data.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.code;
    const errorMessage = error.response?.data?.message;

    if (errorCode === "SBT_METADATA_NOT_FOUND") {
      throw new Error("SBT metadata not found");
    }
    console.error("Error in getPublicSbtMetadata:", errorMessage || error);
    throw error;
  }
}

export const sbt = {
  mintSbt,
  revokeSbt,
  getMySbt,
  getSbtBySub,
  updateSbtMetadata,
  getPublicSbtMetadata,
};
