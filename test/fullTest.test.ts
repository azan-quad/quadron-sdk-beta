// import { initSDK } from '../src/index';

// // Mock API client for demonstration (replace with real mocks or integration as needed)
// jest.mock('../src/apiClient', () => ({
//   getApiClient: () => ({
//     post: jest.fn((url, body) => {
//       if (url === '/wallet/create') {
//         if (typeof body.withSmartWallet !== 'boolean') throw new Error('Invalid argument');
//         return Promise.resolve({ data: { walletId: 'mock-wallet', smart: body.withSmartWallet } });
//       }
//       if (url === '/sbt/mint') {
//         if (!body.userAddress) throw new Error('userAddress is required');
//         return Promise.resolve({ data: { tokenId: 1, owner: body.userAddress } });
//       }
//       if (url === '/sbt/revoke') {
//         if (!body.tokenId) throw new Error('tokenId is required');
//         return Promise.resolve({ data: { tokenId: body.tokenId } });
//       }
//       throw new Error('Unknown endpoint');
//     }),
//   }),
// }));

// describe('SDK Setup', () => {
//   it('should initialize SDK with valid config (happy case)', () => {
//     const config = { API_BASE_URL: 'https://mock-api.example.com', API_KEY: 'dummy-key' };
//     const sdk = initSDK(config);
//     expect(sdk).toHaveProperty('wallets');
//     expect(sdk).toHaveProperty('sbt');
//     expect(typeof sdk.wallets.create).toBe('function');
//     expect(typeof sdk.sbt.mint).toBe('function');
//   });

//   it('should throw error if API_BASE_URL is missing (bad case)', () => {
//     // @ts-expect-error: testing bad input
//     expect(() => initSDK({})).toThrow('API_BASE_URL is required');
//   });
// });

// describe('wallets.createWallet', () => {
//   const sdk = initSDK({ API_BASE_URL: 'mock' });
//   it('should create a wallet (happy case)', async () => {
//     const result = await sdk.wallets.create(true);
//     expect(result).toHaveProperty('walletId');
//     expect(result.smart).toBe(true);
//   });
//   it('should throw if argument is not boolean (bad case)', async () => {
//     // @ts-expect-error: testing bad input
//     await expect(sdk.wallets.create('not-boolean')).rejects.toThrow('Invalid argument');
//   });
// });

// describe('sbt.mintSbt', () => {
//   const sdk = initSDK({ API_BASE_URL: 'mock' });
//   it('should mint SBT for valid user address (happy case)', async () => {
//     const result = await sdk.sbt.mint('0x123');
//     expect(result).toHaveProperty('tokenId');
//     expect(result.owner).toBe('0x123');
//   });
//   it('should throw if userAddress is missing (bad case)', async () => {
//     // @ts-expect-error: testing bad input
//     await expect(sdk.sbt.mint()).rejects.toThrow('userAddress is required');
//   });
// });

// describe('sbt.revokeSbt', () => {
//   const sdk = initSDK({ API_BASE_URL: 'mock' });
//   it('should revoke SBT for valid tokenId (happy case)', async () => {
//     const result = await sdk.sbt.revoke(123);
//     expect(result).toHaveProperty('tokenId');
//     expect(result.tokenId).toBe(123);
//   });
//   it('should throw if tokenId is missing (bad case)', async () => {
//     // @ts-expect-error: testing bad input
//     await expect(sdk.sbt.revoke()).rejects.toThrow('tokenId is required');
//   });
// });