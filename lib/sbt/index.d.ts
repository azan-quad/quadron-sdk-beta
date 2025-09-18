import { GetSbtMetadataRes, MintSbtReq, MintSbtRes, RevokeSbtReq, UpdateSbtMetadataReq, UpdateSbtMetadataRes } from "../interfaces";
declare function hasSbt(): Promise<any>;
declare function revokeSbt(arg: RevokeSbtReq): Promise<any>;
declare function getSbtMetadata(): Promise<GetSbtMetadataRes | null>;
declare function mintSbt(arg: MintSbtReq): Promise<MintSbtRes | null>;
declare function updateSbtMetadata(updates: UpdateSbtMetadataReq): Promise<UpdateSbtMetadataRes | null>;
export declare const sbt: {
    mintSbt: typeof mintSbt;
    revokeSbt: typeof revokeSbt;
    hasSbt: typeof hasSbt;
    updateSbtMetadata: typeof updateSbtMetadata;
    getSbtMetadata: typeof getSbtMetadata;
};
export {};
