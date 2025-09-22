import { MintSbtReq, MintSbtRes, RevokeSbtReq, RevokeSbtRes, GetSbtRes, UpdateSbtMetadataReq, UpdateSbtMetadataRes, PublicSbtMetadata } from "../interfaces";
declare function mintSbt(arg: MintSbtReq): Promise<MintSbtRes | null>;
declare function revokeSbt(arg: RevokeSbtReq): Promise<RevokeSbtRes | null>;
declare function getMySbt(): Promise<GetSbtRes | null>;
declare function getSbtByAccessId(cognitoSub: string): Promise<GetSbtRes | null>;
declare function updateSbtMetadata(updates: UpdateSbtMetadataReq): Promise<UpdateSbtMetadataRes | null>;
declare function getPublicSbtMetadata(tokenId: number): Promise<PublicSbtMetadata | null>;
export declare const sbt: {
    mintSbt: typeof mintSbt;
    revokeSbt: typeof revokeSbt;
    getMySbt: typeof getMySbt;
    getSbtByAccessId: typeof getSbtByAccessId;
    updateSbtMetadata: typeof updateSbtMetadata;
    getPublicSbtMetadata: typeof getPublicSbtMetadata;
};
export {};
