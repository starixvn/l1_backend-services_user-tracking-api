import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSessionService } from './user-game-session.service';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateDto } from './models/user-game-session.dto';

describe('UserGameSessionService', () => {
  let service: UserGameSessionService;
  let mockModel: Model<UserGameSessionDocument>;

  beforeEach(async () => {
    const mockModelConstructor = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGameSessionService,
        {
          provide: getModelToken(UserGameSession.name),
          useValue: mockModelConstructor,
        },
      ],
    }).compile();

    service = module.get<UserGameSessionService>(UserGameSessionService);
    mockModel = module.get<Model<UserGameSessionDocument>>(getModelToken(UserGameSession.name));
  });

  describe('signIn', () => {
    it('should create and save user game session with correct input', async () => {
      // Arrange
      const inputDto: CreateDto = {
        sessionId: 'tLvCKJxi10nAzekWPLzhbfPduOJwTyYf_ONEworksVGCash_880',
        ip: '10.10.50.123',
        browserUserAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        siteId: '4100300',
        userId: '68995799e891f774acbdd6b1',
        language: 'vi-VN',
        currencyCode: 'VND',
        currencyName: 'UUS',
        currencyGroupId: '61b953ad815d6c000196a14c',
        isTestCurrency: true,
        multiplier: 1000,
        memberName: 'username_880',
        siteName: 'brian',
        system: 1,
        operatorId: 'ONEworksVGCash',
        playerId: '880',
        playerName: 'username_880',
        characterName: 'characterName',
        disableJackpotGames: false,
        operatorToken: 'ONEworksVGCashToken',
        disableAward: false,
        gameId: 123,
        gameConfigType: 1,
      };
      const expectedResult = { _id: '68995799e891f7911fbdd6b3', ...inputDto };
      const mockSave = jest.fn().mockResolvedValue(expectedResult);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);
      // Act
      const result = await service.signIn({ createDto: inputDto });
      // Assert
      expect(mockModel).toHaveBeenCalledWith(inputDto);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should handle save errors', async () => {
      // Arrange
      const inputDto: CreateDto = {
        sessionId: 'session',
        ip: '127.0.0.1',
        browserUserAgent: 'agent',
        siteId: 'site',
        userId: 'userId',
        language: 'en',
        currencyCode: 'USD',
        currencyName: 'Dollar',
        currencyGroupId: 'group',
        isTestCurrency: false,
        multiplier: 1,
        memberName: 'memberName',
        siteName: 'siteName',
        system: 1,
        operatorId: 'operator',
        playerId: 'player',
        playerName: 'playerName',
        characterName: 'characterName',
        disableJackpotGames: false,
        operatorToken: 'token',
        disableAward: false,
        gameId: 456,
        gameConfigType: 2,
      };
      const mockError = new Error('Database error');
      const mockSave = jest.fn().mockRejectedValue(mockError);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);
      // Act & Assert
      await expect(service.signIn({ createDto: inputDto })).rejects.toThrow('Database error');
      expect(mockModel).toHaveBeenCalledWith(inputDto);
      expect(mockSave).toHaveBeenCalled();
    });
  });
});
