import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSessionService } from './user-game-session.service';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateUserGameSessionDto } from './models/user-game-session.dto';

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

  describe('saveUserGameSession', () => {
    it('should create and save user game session with correct input', async () => {
      // Arrange
      const inputDto: CreateUserGameSessionDto = {
        ssoToken: 'd05f1557-06a2-4b36-9c9f-30a80608cc96',
        sessionId: 'tLvCKJxi10nAzekWPLzhbfPduOJwTyYf_ONEworksVGCash_880',
        owSeq: undefined,
        username: 'ONEworksVGCash_880',
        memberId: '880',
        ssoTime: new Date('2025-08-11T02:38:17.558Z'),
        recheckInTime: new Date('2025-08-11T02:40:05.286Z'),
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
        partnerId: 'ONEworksVGCash',
        memberName: 'username_880',
        siteName: 'brian',
        system: 1,
        operatorId: 'ONEworksVGCash',
        playerId: '880',
        playerName: 'username_880',
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
      const result = await service.saveUserGameSession({ createUserGameSessionDto: inputDto });
      // Assert
      expect(mockModel).toHaveBeenCalledWith(inputDto);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should handle save errors', async () => {
      // Arrange
      const inputDto: CreateUserGameSessionDto = {
        ssoToken: 'token',
        sessionId: 'session',
        username: 'user',
        memberId: 'member',
        ssoTime: new Date(),
        recheckInTime: new Date(),
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
        partnerId: 'partner',
        memberName: 'memberName',
        siteName: 'siteName',
        system: 1,
        operatorId: 'operator',
        playerId: 'player',
        playerName: 'playerName',
        disableJackpotGames: false,
        operatorToken: 'token',
        disableAward: false,
        gameId: 123,
        gameConfigType: 1,
      };
      const mockError = new Error('Database error');
      const mockSave = jest.fn().mockRejectedValue(mockError);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);
      // Act & Assert
      await expect(
        service.saveUserGameSession({ createUserGameSessionDto: inputDto }),
      ).rejects.toThrow('Database error');
      expect(mockModel).toHaveBeenCalledWith(inputDto);
      expect(mockSave).toHaveBeenCalled();
    });
  });
});
