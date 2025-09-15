# Quadron SDK Function Reference (MVP)

```js
import { initSDK } from 'quadron-sdk-beta';
const quad = await initSDK({ API_BASE_URL, API_KEY });
```

## Frontend Functions

| Name    | Description                |
|---------|----------------------------|
| get     | Get wallet info            |
| create  | Create new wallet          |
| recover | Recover wallet             |
| smart   | Create smart wallet        |
| exists  | Check if SBT exists        |
| mint    | Mint SBT                   |
| fetch   | Fetch SBT metadata         |
| createWalletAndMintSbt | Create wallet and mint SBT in one call |

**Usage:**
- Pass `cognitoSub` in the body. No Bearer token or API key needed.

### Examples

```js
// Get wallet info
quadron.wallets.get({ cognitoSub: 'user-sub' }); // Calls: API_BASE_URL/wallet (POST)

// Create new wallet
quadron.wallets.create({ cognitoSub: 'user-sub' }); // Calls: API_BASE_URL/wallet/create (POST)

// Recover wallet
quadron.wallets.recover({ cognitoSub: 'user-sub', recoveryPhrase: '...' }); // Calls: API_BASE_URL/wallet/recover (POST)

// Create smart wallet
quadron.wallets.smart({ cognitoSub: 'user-sub' }); // Calls: API_BASE_URL/wallet/smart (POST)

// Create wallet and mint SBT in one call
quadron.wallets.createWalletAndMintSbt({
  cognitoSub: 'user-sub',
  withSmartWallet: true, // or false
  mintSBT: true, // always true for minting
  name: 'SBT Name',
  description: 'SBT Description',
  image: 'https://example.com/image.png',
  attributes: ['attr1', 'attr2']
});
// Calls: API_BASE_URL/wallet/create (POST) and API_BASE_URL/sbt/mint (POST)

// Check if SBT exists
quadron.sbt.exists({ cognitoSub: 'user-sub' }); // Calls: API_BASE_URL/sbt/exists/{userAddress} (GET)

// Mint SBT
quadron.sbt.mint({ cognitoSub: 'user-sub', data: {/* ... */} }); // Calls: API_BASE_URL/sbt/mint (POST)

// Fetch SBT metadata
quadron.sbt.fetch({ cognitoSub: 'user-sub' }); // Calls: API_BASE_URL/sbt/metadata/{tokenId} (GET)
```

---

## Backend/Admin Functions

| Name    | Description                |
|---------|----------------------------|
| update  | Update SBT metadata        |
| revoke  | Revoke SBT                 |

**Usage:**
- Must be called from backend. Pass API key (hardcoded for MVP).

### Examples

```js
// Update SBT metadata (admin)
quadron.sbt.update({ cognitoSub: 'user-sub', data: {/* ... */} }, { apiKey: 'YOUR_API_KEY' }); // Calls: API_BASE_URL/sbt/updateMetadata/{tokenId} (PUT)

// Revoke SBT (admin)
quadron.sbt.revoke({ cognitoSub: 'user-sub', sbtId: 'sbt-id' }, { apiKey: 'YOUR_API_KEY' }); // Calls: API_BASE_URL/sbt/revoke (POST)

```

**Note:**
- Replace `'user-sub'` with the actual Cognito user sub.
- Replace `'YOUR_API_KEY'` with your backend’s API key.
- Frontend functions do not require API key or Bearer token.
- Backend/admin functions must be protected and never exposed to the frontend.

---

## Error Handling

The SDK throws errors in the following cases:

| Error Message                                      | Reason                                                      |
|----------------------------------------------------|-------------------------------------------------------------|
| API_BASE_URL is required to initialize the SDK      | You must provide API_BASE_URL when calling initSDK          |
| API_BASE_URL is not set. Please initialize the SDK first. | You must call initSDK before using any SDK function         |
| userAddress is required                            | The userAddress parameter is required for SBT operations    |
| tokenId is required                                | The tokenId parameter is required for SBT revoke operation  |