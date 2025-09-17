import { getApiClient } from "../apiClient";

async function mintSbt({
  cognitoSub,
  name,
  description,
  image,
  attributes,
}: {
  cognitoSub: string;
  name?: string;
  description?: string;
  image?: string;
  attributes?: string[];
}): Promise<{ tokenId: number; owner: string; metadata: any } | any> {
  try {
    if (!cognitoSub) throw new Error("cognitoSub is required");
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/mint", { cognitoSub, name, description, image, attributes });
    return res.data;
  } catch (error) {
    console.error("Error in mintSbt:", error);
    return null;
  }
}

async function revokeSbt(cognitoSub: { cognitoSub: string }): Promise<any> {
  try {
    if (cognitoSub === undefined || cognitoSub === null) {
      throw new Error("cognitoSub is required");
    }
    const apiClient = getApiClient();
    const res = await apiClient.post("/sbt/revoke", { cognitoSub });
    return res.data;
  } catch (error) {
    console.error("Error in revokeSbt:", error);
    return null;
  }
}

async function hasSbt(cognitoSub: { cognitoSub: string }): Promise<any> {
  try {
    if (!cognitoSub) throw new Error("cognitoSub is required");
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/exists/${cognitoSub}`);
    return res.data;
  } catch (error) {
    console.error("Error in hasSbt:", error);
    return null;
  }
}

async function getSbtMetadata(cognitoSub: {
  cognitoSub: string;
}): Promise<{ tokenId: number; name?: string; description?: string; image?: string; attributes?: string[] } | any> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.get(`/sbt/metadata/${cognitoSub}`);
    return res.data;
  } catch (error) {
    console.error("Error in getSbtMetadata:", error);
    return null;
  }
}

async function updateSbtMetadata({
  cognitoSub,
  updates,
}: {
  cognitoSub: string;
  updates: any;
}): Promise<{ tokenId: number; name?: string; description?: string; image?: string; attributes?: string[] } | any> {
  try {
    const apiClient = getApiClient();
    const res = await apiClient.put(`/sbt/updateMetadata/${cognitoSub}`, updates);
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
