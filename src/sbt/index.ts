import { getApiClient } from "../apiClient";
import {
  GetSbtMetadataRes,
  MintSbtReq,
  MintSbtRes,
  RevokeSbtReq,
  UpdateSbtMetadataReq,
  UpdateSbtMetadataRes,
} from "../interfaces";

async function hasSbt(): Promise<any> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/exists`);
    return res.data;
  } catch (error) {
    console.error("Error in hasSbt:", error);
    return null;
  }
}

async function revokeSbt(arg: RevokeSbtReq): Promise<any> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/revoke", arg);
    return res.data;
  } catch (error) {
    console.error("Error in revokeSbt:", error);
    return null;
  }
}

async function getSbtMetadata(): Promise<GetSbtMetadataRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/metadata`);
    return res.data;
  } catch (error) {
    console.error("Error in getSbtMetadata:", error);
    return null;
  }
}

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

async function updateSbtMetadata(updates: UpdateSbtMetadataReq): Promise<UpdateSbtMetadataRes | null> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.put(`/sbt/updateMetadata`, updates);
    return res.data;
  } catch (error) {
    console.error("Error in updateSbtMetadata:", error);
    return null;
  }
}

export const sbt = {
  mintSbt,
  revokeSbt,
  hasSbt,
  updateSbtMetadata,
  getSbtMetadata,
};
