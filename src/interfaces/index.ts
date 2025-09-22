export interface QuadronSDKConfig {
  API_BASE_URL: string;
  isClient: boolean;
  COGNITO_JWT?: string;
  API_KEY?: string;
}

// GET /wallet/
export interface GetWalletRes {
  _id: string;
  cognitoSub: string;
  publicAddress: string;
  smartWalletAddress: string | null;
  isSmartWalletDeployed: boolean;
  revoked: boolean;
  sbtTokenId: string | null;
  createdAt: string;
}

// POST /wallet/create
export interface CreateWalletReq {
  withSmartWallet: boolean;
}
export interface CreateWalletRes {
  cognitoSub: string;
  publicAddress: string;
  smartWalletAddress: string | null;
  isSmartWalletDeployed: boolean;
}

// POST /wallet/recover
export interface RecoverWalletRes {
  address: string;
  privateKey: string;
  mnemonic: string;
}

// POST /wallet/smart
export interface CreateSmartWalletForExistingRes {
  publicAddress: string;
  smartWalletAddress: string;
}

// POST /wallet/revoke
export interface RevokeWalletReq {
  cognitoSub: string;
}
export interface RevokeWalletRes {
  cognitoSub: string;
  revoked: boolean;
  publicAddress: string;
}

export interface CreateWalletAndMintSbtReq {
  cognitoSub: string;
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
  cognitoSub: string;
}

export interface MintSbtRes {
  cognitoSub: string;
  tokenId: number;
  ownerAddress: string;
  identity: Identity;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RevokeSbtReq {
  cognitoSub: string;
}

export interface RevokeSbtRes {
  success: boolean;
  tokenId: number;
}

export interface GetSbtRes {
  cognitoSub: string;
  tokenId: number;
  ownerAddress: string;
  identity: Identity;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSbtMetadataReq {
  cognitoSub: string;
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
  cognitoSub: string;
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
