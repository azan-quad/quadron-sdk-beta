import { MintSbtReq, MintSbtRes, RevokeSbtReq, RevokeSbtRes, GetSbtRes, UpdateSbtMetadataReq, UpdateSbtMetadataRes, PublicSbtMetadata } from "../interfaces";
declare function mintSbt(arg: MintSbtReq): Promise<MintSbtRes>;
declare function revokeSbt(arg: RevokeSbtReq): Promise<RevokeSbtRes>;
declare function getMySbt(): Promise<GetSbtRes | null>;
declare function getSbtBySub(userSub: string): Promise<GetSbtRes | null>;
declare function updateSbtMetadata(updates: UpdateSbtMetadataReq): Promise<UpdateSbtMetadataRes>;
declare function getPublicSbtMetadata(tokenId: number): Promise<PublicSbtMetadata>;
export declare const sbt: {
    mintSbt: typeof mintSbt;
    revokeSbt: typeof revokeSbt;
    getMySbt: typeof getMySbt;
    getSbtBySub: typeof getSbtBySub;
    updateSbtMetadata: typeof updateSbtMetadata;
    getPublicSbtMetadata: typeof getPublicSbtMetadata;
};
export {};
