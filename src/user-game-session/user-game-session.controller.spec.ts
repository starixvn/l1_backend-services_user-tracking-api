import { Test, TestingModule } from '@nestjs/testing';
import { UserGameSessionController } from './user-game-session.controller';
import { UserGameSessionService } from './user-game-session.service';
import { CreateDto } from './models/user-game-session.dto';

describe('UserGameSessionController', () => {
  let controller: UserGameSessionController;
  let service: UserGameSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGameSessionController],
      providers: [
        {
          provide: UserGameSessionService,
          useValue: {
            signIn: jest.fn(),
            signOut: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<UserGameSessionController>(UserGameSessionController);
    service = module.get<UserGameSessionService>(UserGameSessionService);
  });

  describe('create', () => {
    it('should call service and return success response', async () => {
      // Arrange
      const inputDto: CreateDto = {
        sessionId: 'session',
        username: 'user',
        memberId: 'member',
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
        appType: 1,
      };

      const expectedResponse = {
        errorCode: 0,
        message: 'created new user game session',
      };

      const mockUserGameSession = { _id: 'test-id', ...inputDto };
      jest.spyOn(service, 'signIn').mockResolvedValue(mockUserGameSession as any);

      // Act
      const result = await controller.signIn(inputDto);

      // Assert
      expect(service.signIn).toHaveBeenCalledWith({
        createDto: inputDto,
      });
      expect(result).toStrictEqual(expectedResponse);
    });
  });
});
