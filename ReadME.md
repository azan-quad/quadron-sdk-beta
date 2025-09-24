# Quadron SDK Function Reference (MVP)

```js
import { initSDK } from "quadron-sdk-beta";
const quadron = await initSDK({ API_BASE_URL, isClient: true, ACCESS_TOKEN });
// For backend usage:
// const quadron = await initSDK({ API_BASE_URL, isClient: false, API_KEY });
```

## Frontend Functions

| Name                   | Description                             |
| ---------------------- | --------------------------------------- |
| get                    | Get wallet info                         |
| create                 | Create new wallet                       |
| recover                | Recover wallet                          |
| smart                  | Create smart wallet for existing wallet |
| createWalletAndMintSbt | Create wallet and mint SBT in one call  |
| exists                 | Check if SBT exists                     |
| mint                   | Mint SBT                                |
| fetch                  | Fetch SBT metadata                      |

**Usage:**

- For frontend, pass `ACCESS_TOKEN` in the SDK config. No API key needed.

### Examples

```js
// Create wallet and mint SBT in one call
quadron.wallets.createWalletAndMintSbt({
  withSmartWallet: true, // or false
  mintSBT: true, // always true for minting
  name: 'SBT Name',
  description: 'SBT Description',
  image: 'https://example.com/image.png',
  attributes: ['attr1', 'attr2']
});
// Calls: /wallet/create (POST) & /sbt/mint (POST)

// Get wallet info
quadron.wallets.get(); // Calls: /wallet (POST)

// Create new wallet
quadron.wallets.create({ withSmartWallet: true }); // Calls: /wallet/create (POST)

// Recover wallet
quadron.wallets.recover(); // Calls: /wallet/recover (POST)

// Create smart wallet for existing wallet
quadron.wallets.smart(); // Calls: /wallet/smart (POST)

// Check if SBT exists
quadron.sbt.exists(); // Calls: /sbt/exists (GET)

// Mint SBT
quadron.sbt.mint({ name: '...', description: '...', image: '...', attributes: [...] }); // Calls: /sbt/mint (POST)

// Fetch SBT metadata
quadron.sbt.fetch(); // Calls: /sbt/metadata (GET)
```

---

## Backend/Admin Functions

| Name   | Description         |
| ------ | ------------------- |
| update | Update SBT metadata |
| revoke | Revoke SBT          |

**Usage:**

- Must be called from backend. Pass API key in the SDK config.

### Examples

```js
// Update SBT metadata (admin)
quadron.sbt.update({ userSub: 'user-sub', name: '...', description: '...', image: '...', attributes: [...] }); // Calls: /sbt/updateMetadata (PUT)

// Revoke SBT (admin)
quadron.sbt.revoke({ userSub: 'user-sub' }); // Calls: /sbt/revoke (POST)
```

**Note:**

- Replace `'user-sub'` with the actual Cognito/Keycloak user sub if required by your backend logic.
- Replace `'YOUR_API_KEY'` with your backend’s API key in the SDK config.
- Frontend functions do not require API key.
- Backend/admin functions must be protected and never exposed to the frontend.

---

## Error Handling

The SDK throws errors in the following cases:

| Error Message                                                 | Reason                                                      |
| ------------------------------------------------------------- | ----------------------------------------------------------- |
| API_BASE_URL is required to initialize the SDK                | You must provide API_BASE_URL when calling initSDK          |
| ACCESS_TOKEN is required to initialize the SDK on client side | You must provide ACCESS_TOKEN in config if isClient is true |
| API_KEY is required to initialize the SDK on server side      | You must provide API_KEY in config if isClient is false     |
| API_BASE_URL is not set. Please initialize the SDK first.     | You must call initSDK before using any SDK function         |

Other errors may be thrown if required parameters are missing in function calls, or if the API returns an error. Always check for null or error responses in your integration.
