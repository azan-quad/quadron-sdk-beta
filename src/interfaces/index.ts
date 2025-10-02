import { wallet } from "../wallets";
import { sbt } from "../sbt";

export interface QuadronSDKConfig {
  API_BASE_URL: string;
  isClient: boolean;
  ACCESS_TOKEN?: string;
  API_KEY?: string;
}

export interface Quad {
  wallets: {
    get: typeof wallet.getWallet;
    getBySub: typeof wallet.getWalletBySub;
    create: typeof wallet.createWallet;
    recover: typeof wallet.recoverWallet;
    createSmartWallet: typeof wallet.createSmartWalletForExisting;
    revoke: typeof wallet.revokeWallet;
  };
  sbt: {
    mint: typeof sbt.mintSbt;
    revoke: typeof sbt.revokeSbt;
    getMySbt: typeof sbt.getMySbt;
    getSbtBySub: typeof sbt.getSbtBySub;
    updateMetadata: typeof sbt.updateSbtMetadata;
    getPublicMetadata: typeof sbt.getPublicSbtMetadata;
  };
}

export interface GetWalletRes {
  _id: string;
  userSub: string;
  publicAddress: string;
  smartWalletAddress: string | null;
  isSmartWalletDeployed: boolean;
  revoked: boolean;
  sbtTokenId: string | null;
  createdAt: string;
}

export interface GetWalletBySubReq {
  userSub: string;
}

export interface CreateWalletReq {
  withSmartWallet: boolean;
}
export interface CreateWalletRes {
  userSub: string;
  publicAddress: string;
  smartWalletAddress: string | null;
  isSmartWalletDeployed: boolean;
}

export interface RecoverWalletRes {
  address: string;
  privateKey: string;
  mnemonic: string;
}

export interface CreateSmartWalletForExistingRes {
  publicAddress: string;
  smartWalletAddress: string;
}

export interface RevokeWalletReq {
  userSub: string;
}
export interface RevokeWalletRes {
  userSub: string;
  revoked: boolean;
  publicAddress: string;
}

export interface CreateWalletAndMintSbtReq {
  userSub: string;
  withSmartWallet: boolean;
  mintSbt: boolean;
}

export interface CreateWalletAndMintSbtRes {
  wallet: CreateWalletRes;
  sbt?: MintSbtRes;
}

export interface Identity {
  quadronRole: string;
  reputationScore: number;
  contributions: number;
  reviews: number;
  badges: string[];
  metadataVersion: number;
  name: string;
}

export interface MintSbtReq {
  userSub: string;
}

export interface MintSbtRes {
  userSub: string;
  tokenId: number;
  ownerAddress: string;
  identity: Identity;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RevokeSbtReq {
  userSub: string;
}

export interface RevokeSbtRes {
  success: boolean;
  tokenId: number;
}

export interface GetSbtRes {
  userSub: string;
  tokenId: number;
  ownerAddress: string;
  identity: Identity;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSbtMetadataReq {
  userSub: string;
  updates: {
    quadronRole?: string;
    reputationScore?: number;
    contributions?: number;
    reviews?: number;
    badges?: string[];
  };
}

export interface UpdateSbtMetadataRes {
  tokenId: number;
  ownerAddress: string;
  userSub: string;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;

  identity: {
    quadronRole?: string;
    reputationScore?: number;
    contributions?: number;
    reviews?: number;
    badges?: string[];
    metadataVersion?: number;
    name?: string;
  };
}

export interface PublicSbtMetadata {
  name: string;
  description: string;
  quadronRole: string;
  reputationScore: number;
  contributions: number;
  reviews: number;
  badges: string[];
  metadataVersion: number;
}
