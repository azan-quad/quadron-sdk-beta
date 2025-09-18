export type GetWalletRes = {
    cognitoSub: string;
    publicAddress: string;
    smartWalletAddress: string;
    isSmartWalletDeployed: boolean;
    revoked: boolean;
} | null;
export type CreateWalletReq = {
    withSmartWallet: boolean;
};
export type CreateWalletRes = {
    publicAddress: string;
    smartWalletAddress: string;
} | null;
export type RecoverWalletRes = {
    address: string;
    privateKey: string;
    mnemonic: string;
} | null;
export type CreateSmartWalletForExistingRes = {
    publicAddress: string;
    smartWalletAddress: string;
} | null;
export type CreateWalletAndMintSbtReq = {
    withSmartWallet: boolean;
    mintSBT: boolean;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
};
export type CreateWalletAndMintSbtRes = {
    wallet: {
        publicAddress: string;
        smartWalletAddress: string;
    } | null;
    mintedToken: MintSbtRes | undefined;
};
export type GetSbtMetadataRes = {
    tokenId: number;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
} | null;
export type RevokeSbtReq = {
    cognitoSub: string;
};
export type MintSbtReq = {
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
} | null;
export type MintSbtRes = {
    tokenId: number;
    owner: string;
    metadata: any;
} | null;
export type UpdateSbtMetadataReq = {
    cognitoSub: string;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
};
export type UpdateSbtMetadataRes = {
    tokenId: number;
    name?: string;
    description?: string;
    image?: string;
    attributes?: string[];
} | null;
