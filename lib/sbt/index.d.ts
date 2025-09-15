declare function mintSbt(userAddress: string, name?: string, description?: string, image?: string, attributes?: string[]): Promise<{
    tokenId: number;
    owner: string;
    metadata: any;
} | any>;
declare function revokeSbt(tokenId: number): Promise<any>;
declare function hasSbt(userAddress: string): Promise<any>;
declare function getSbtMetadata(tokenId: number): Promise<{
    tokenId: number;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
} | any>;
declare function updateSbtMetadata(tokenId: number, updates: object): Promise<{
    tokenId: number;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
} | any>;
export declare const sbt: {
    mintSbt: typeof mintSbt;
    revokeSbt: typeof revokeSbt;
    hasSbt: typeof hasSbt;
    updateSbtMetadata: typeof updateSbtMetadata;
    getSbtMetadata: typeof getSbtMetadata;
};
export {};
