import { getApiClient } from "../apiClient";

async function mintSbt(
  userAddress: string,
  name?: string,
  description?: string,
  image?: string,
  attributes?: string[],
): Promise<{ tokenId: number; owner: string; metadata: any } | any> {
  if (!userAddress) throw new Error("userAddress is required");
  const apiClient = getApiClient();
  const res = await apiClient.post("/sbt/mint", { userAddress, name, description, image, attributes });
  return res.data;
}

async function revokeSbt(tokenId: number): Promise<any> {
  if (tokenId === undefined || tokenId === null) {
    throw new Error("tokenId is required");
  }
  const apiClient = getApiClient();
  const res = await apiClient.post("/sbt/revoke", { tokenId });
  return res.data;
}

async function hasSbt(userAddress: string): Promise<any> {
  if (!userAddress) throw new Error("userAddress is required");
  const apiClient = getApiClient();
  const res = await apiClient.get(`/sbt/exists/${encodeURIComponent(userAddress)}`);
  return res.data;
}

async function getSbtMetadata(
  tokenId: number,
): Promise<{ tokenId: number; name?: string; description?: string; image?: string; attributes?: string[] } | any> {
  const apiClient = getApiClient();
  const res = await apiClient.get(`/sbt/metadata/${tokenId}`);
  return res.data;
}

async function updateSbtMetadata(
  tokenId: number,
  updates: object,
): Promise<{ tokenId: number; name?: string; description?: string; image?: string; attributes?: string[] } | any> {
  const apiClient = getApiClient();
  const res = await apiClient.put(`/sbt/updateMetadata/${tokenId}`, updates);
  return res.data;
}

export const sbt = {
  mintSbt,
  revokeSbt,
  hasSbt,
  updateSbtMetadata,
  getSbtMetadata,
};
