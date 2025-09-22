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

async function mintSbt(arg: MintSbtReq): Promise<MintSbtRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/mint", arg);
    return res.data;
  } catch (error) {
    console.error("Error in mintSbt:", error);
    return null;
  }
}

async function revokeSbt(arg: RevokeSbtReq): Promise<RevokeSbtRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/revoke", arg);
    return res.data;
  } catch (error) {
    console.error("Error in revokeSbt:", error);
    return null;
  }
}

async function getMySbt(): Promise<GetSbtRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get("/sbt/me");
    return res.data;
  } catch (error) {
    console.error("Error in getMySbt:", error);
    return null;
  }
}

async function getSbtByAccessId(cognitoSub: string): Promise<GetSbtRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/user?cognitoSub=${encodeURIComponent(cognitoSub)}`);
    return res.data;
  } catch (error) {
    console.error("Error in getSbtByCognitoSub:", error);
    return null;
  }
}

async function updateSbtMetadata(updates: UpdateSbtMetadataReq): Promise<UpdateSbtMetadataRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.patch("/sbt/update", updates);
    return res.data;
  } catch (error) {
    console.error("Error in updateSbtMetadata:", error);
    return null;
  }
}

async function getPublicSbtMetadata(tokenId: number): Promise<PublicSbtMetadata | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/token/${tokenId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getPublicSbtMetadata:", error);
    return null;
  }
}

export const sbt = {
  mintSbt,
  revokeSbt,
  getMySbt,
  getSbtByAccessId,
  updateSbtMetadata,
  getPublicSbtMetadata,
};
