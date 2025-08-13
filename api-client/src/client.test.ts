import { TrackingClient, SignInReq, SignOutReq } from './index';

describe('TrackingClient', () => {
  let client: TrackingClient;

  beforeEach(() => {
    client = new TrackingClient('http://localhost:3000');
  });

  describe('signIn', () => {
    it('should make POST request to /game/sign-in and return success', async () => {
      const mockData: SignInReq = {
        sessionId: 'test-session',
        browserUserAgent: 'test-agent',
        ip: '127.0.0.1',
        siteId: 'site-123',
        userId: 'user-123',
        language: 'en',
        currencyCode: 'USD',
        currencyName: 'US Dollar',
        currencyGroupId: 'group-1',
        isTestCurrency: false,
        multiplier: 1,
        memberName: 'Test Member',
        siteName: 'Test Site',
        system: 1,
        operatorId: 'op-123',
        playerId: 'player-123',
        playerName: 'Test Player',
        characterName: 'Test Character',
        disableJackpotGames: false,
        operatorToken: 'token-123',
        disableAward: false,
        gameId: 1001,
        gameConfigType: 1,
        balance: 1000,
      };

      const mockResponse = { errorCode: 0, message: 'created new user game session' };

      jest.spyOn(client['client'], 'post').mockResolvedValue({
        data: mockResponse,
      } as any);

      const result = await client.signIn(mockData);

      expect(client['client'].post).toHaveBeenCalledWith('/game/sign-in', mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle failed sign-in response', async () => {
      const mockData: SignInReq = {
        sessionId: 'test-session',
        browserUserAgent: 'test-agent',
        ip: '127.0.0.1',
        siteId: 'site-123',
        userId: 'user-123',
        language: 'en',
        currencyCode: 'USD',
        currencyName: 'US Dollar',
        currencyGroupId: 'group-1',
        isTestCurrency: false,
        multiplier: 1,
        memberName: 'Test Member',
        siteName: 'Test Site',
        system: 1,
        operatorId: 'op-123',
        playerId: 'player-123',
        playerName: 'Test Player',
        characterName: 'Test Character',
        disableJackpotGames: false,
        operatorToken: 'token-123',
        disableAward: false,
        gameId: 1001,
        gameConfigType: 1,
        balance: 1000,
      };

      const mockResponse = { errorCode: 1, message: 'failed to create user game session' };

      jest.spyOn(client['client'], 'post').mockResolvedValue({
        data: mockResponse,
      } as any);

      const result = await client.signIn(mockData);

      expect(client['client'].post).toHaveBeenCalledWith('/game/sign-in', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('signOut', () => {
    it('should make POST request to /game/sign-out and return success', async () => {
      const mockData: SignOutReq = {
        sessionId: 'test-session',
        gameId: 1001,
        balance: 1500,
      };

      const mockResponse = { errorCode: 0, message: 'updated user game session' };

      jest.spyOn(client['client'], 'post').mockResolvedValue({
        data: mockResponse,
      } as any);

      const result = await client.signOut(mockData);

      expect(client['client'].post).toHaveBeenCalledWith('/game/sign-out', mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle failed sign-out response', async () => {
      const mockData: SignOutReq = {
        sessionId: 'test-session',
        gameId: 1001,
        balance: 1500,
      };

      const mockResponse = { errorCode: 1, message: 'failed to update user game session' };

      jest.spyOn(client['client'], 'post').mockResolvedValue({
        data: mockResponse,
      } as any);

      const result = await client.signOut(mockData);

      expect(client['client'].post).toHaveBeenCalledWith('/game/sign-out', mockData);
      expect(result).toEqual(mockResponse);
    });
  });
});
