import { getApiClient } from "../apiClient";

async function mintSbt(
  userAddress: string,
  name?: string,
  description?: string,
  image?: string,
  attributes?: string[],
): Promise<{ tokenId: number; owner: string; metadata: any } | any> {
  try {
    if (!userAddress) throw new Error("userAddress is required");
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/mint", { userAddress, name, description, image, attributes });
    return res.data;
  } catch (error) {
    console.error("Error in mintSbt:", error);
    return null;
  }
}

async function revokeSbt(tokenId: number): Promise<any> {
  try {
    if (tokenId === undefined || tokenId === null) {
      throw new Error("tokenId is required");
    }
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/revoke", { tokenId });
    return res.data;
  } catch (error) {
    console.error("Error in revokeSbt:", error);
    return null;
  }
}

async function hasSbt(userAddress: string): Promise<any> {
  try {
    if (!userAddress) throw new Error("userAddress is required");
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/exists/${encodeURIComponent(userAddress)}`);
    return res.data;
  } catch (error) {
    console.error("Error in hasSbt:", error);
    return null;
  }
}

async function getSbtMetadata(
  tokenId: number,
): Promise<{ tokenId: number; name?: string; description?: string; image?: string; attributes?: string[] } | any> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/metadata/${tokenId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getSbtMetadata:", error);
    return null;
  }
}

async function updateSbtMetadata(
  tokenId: number,
  updates: object,
): Promise<{ tokenId: number; name?: string; description?: string; image?: string; attributes?: string[] } | any> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.put(`/sbt/updateMetadata/${tokenId}`, updates);
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
