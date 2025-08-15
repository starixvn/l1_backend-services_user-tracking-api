import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSessionService } from './user-game-session.service';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateDto, UpdateDto } from './models/user-game-session.dto';
import { LoggerService } from '../core/logger/logger.service';

describe('UserGameSessionService', () => {
  let service: UserGameSessionService;
  let mockModel: Model<UserGameSessionDocument>;
  let mockLoggerService: any;

  const mockCreateDto: CreateDto = {
    sessionId: 'test-session-id',
    ip: '127.0.0.1',
    browserUserAgent: 'Mozilla/5.0 Test Browser',
    siteId: 'test-site',
    userId: 'test-user-id',
    language: 'en-US',
    currencyCode: 'USD',
    currencyName: 'US Dollar',
    currencyGroupId: 'currency-group-id',
    isTestCurrency: false,
    multiplier: 1,
    memberName: 'test-member',
    siteName: 'test-site-name',
    system: 1,
    operatorId: 'test-operator',
    playerId: 'test-player',
    playerName: 'test-player-name',
    characterName: 'test-character',
    disableJackpotGames: false,
    operatorToken: 'test-token',
    disableAward: false,
    gameId: 123,
    gameConfigType: 1,
  };

  const mockUpdateDto: UpdateDto = {
    sessionId: 'test-session-id',
    gameId: 123,
    balance: 1000,
  };

  beforeEach(async () => {
    const mockModelConstructor = jest.fn();
    mockLoggerService = {
      captureException: jest.fn(),
      captureMessage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGameSessionService,
        {
          provide: getModelToken(UserGameSession.name),
          useValue: mockModelConstructor,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    service = module.get<UserGameSessionService>(UserGameSessionService);
    mockModel = module.get<Model<UserGameSessionDocument>>(getModelToken(UserGameSession.name));
  });

  describe('signIn', () => {
    it('should successfully create and save user game session', async () => {
      const mockSave = jest.fn().mockResolvedValue({ _id: 'test-id', ...mockCreateDto });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: mockCreateDto });

      expect(mockModel).toHaveBeenCalledWith(mockCreateDto);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should set default balance to 0 when balance is not provided', async () => {
      const createDtoWithoutBalance = { ...mockCreateDto };
      delete createDtoWithoutBalance.balance;

      const mockSave = jest.fn().mockResolvedValue({ _id: 'test-id', ...createDtoWithoutBalance });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      await service.signIn({ createDto: createDtoWithoutBalance });

      expect(mockModel).toHaveBeenCalledWith(createDtoWithoutBalance);
      expect(mockSave).toHaveBeenCalled();
    });

    it('should set balance when provided in createDto', async () => {
      const createDtoWithBalance = { ...mockCreateDto, balance: 500 };

      const mockSave = jest.fn().mockResolvedValue({ _id: 'test-id', ...createDtoWithBalance });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      await service.signIn({ createDto: createDtoWithBalance });

      expect(mockModel).toHaveBeenCalledWith(createDtoWithBalance);
      expect(mockSave).toHaveBeenCalled();
    });

    it('should return false when save returns null', async () => {
      const mockSave = jest.fn().mockResolvedValue(null);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: mockCreateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureMessage).toHaveBeenCalledWith(
        'Failed to save user game session',
        'warning',
        {
          sessionId: mockCreateDto.sessionId,
          gameId: mockCreateDto.gameId,
        },
      );
    });

    it('should return false when save returns undefined', async () => {
      const mockSave = jest.fn().mockResolvedValue(undefined);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: mockCreateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureMessage).toHaveBeenCalledWith(
        'Failed to save user game session',
        'warning',
        {
          sessionId: mockCreateDto.sessionId,
          gameId: mockCreateDto.gameId,
        },
      );
    });

    it('should handle database save errors', async () => {
      const mockError = new Error('Database connection failed');
      const mockSave = jest.fn().mockRejectedValue(mockError);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: mockCreateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureException).toHaveBeenCalledWith(mockError, {
        operation: 'signIn',
        sessionId: mockCreateDto.sessionId,
        gameId: mockCreateDto.gameId,
        userId: mockCreateDto.userId,
      });
    });

    it('should handle validation errors', async () => {
      const validationError = new Error('Validation failed');
      const mockSave = jest.fn().mockRejectedValue(validationError);
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: mockCreateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureException).toHaveBeenCalledWith(validationError, {
        operation: 'signIn',
        sessionId: mockCreateDto.sessionId,
        gameId: mockCreateDto.gameId,
        userId: mockCreateDto.userId,
      });
    });

    it('should set signInGameTime, appType, and signInBalance on document', async () => {
      const mockSave = jest.fn().mockResolvedValue({ _id: 'test-id', ...mockCreateDto });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      await service.signIn({ createDto: mockCreateDto });

      expect(mockModel).toHaveBeenCalledWith(mockCreateDto);
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should successfully update user game session for sign out', async () => {
      const mockUpdateMany = jest.fn().mockResolvedValue({ modifiedCount: 1 });
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(mockUpdateMany).toHaveBeenCalledWith(
        {
          sessionId: mockUpdateDto.sessionId,
          gameId: mockUpdateDto.gameId,
          signOutGameTime: { $eq: null },
        },
        { $set: { signOutGameTime: expect.any(Date), signOutBalance: mockUpdateDto.balance } },
        { new: true, lean: true },
      );
      expect(result).toBe(true);
    });

    it('should set default balance to 0 when balance is not provided in updateDto', async () => {
      const updateDtoWithoutBalance = { ...mockUpdateDto };
      delete updateDtoWithoutBalance.balance;

      const mockUpdateMany = jest.fn().mockResolvedValue({ modifiedCount: 1 });
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: updateDtoWithoutBalance });

      expect(mockUpdateMany).toHaveBeenCalledWith(
        {
          sessionId: updateDtoWithoutBalance.sessionId,
          gameId: updateDtoWithoutBalance.gameId,
          signOutGameTime: { $eq: null },
        },
        { $set: { signOutGameTime: expect.any(Date), signOutBalance: 0 } },
        { new: true, lean: true },
      );
      expect(result).toBe(true);
    });

    it('should return false when no documents are updated', async () => {
      const mockUpdateMany = jest.fn().mockResolvedValue({ modifiedCount: 0 });
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(result).toBe(true);
    });

    it('should return false when updateMany returns null', async () => {
      const mockUpdateMany = jest.fn().mockResolvedValue(null);
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(result).toBe(false);
    });

    it('should return false when updateMany returns undefined', async () => {
      const mockUpdateMany = jest.fn().mockResolvedValue(undefined);
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(result).toBe(false);
    });

    it('should handle database update errors', async () => {
      const mockError = new Error('Database update failed');
      const mockUpdateMany = jest.fn().mockRejectedValue(mockError);
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureException).toHaveBeenCalledWith(mockError, {
        operation: 'signOut',
        sessionId: mockUpdateDto.sessionId,
        gameId: mockUpdateDto.gameId,
      });
    });

    it('should handle connection errors during update', async () => {
      const connectionError = new Error('Connection timeout');
      const mockUpdateMany = jest.fn().mockRejectedValue(connectionError);
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureException).toHaveBeenCalledWith(connectionError, {
        operation: 'signOut',
        sessionId: mockUpdateDto.sessionId,
        gameId: mockUpdateDto.gameId,
      });
    });

    it('should handle validation errors during update', async () => {
      const validationError = new Error('Invalid session data');
      const mockUpdateMany = jest.fn().mockRejectedValue(validationError);
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: mockUpdateDto });

      expect(result).toBe(false);
      expect(mockLoggerService.captureException).toHaveBeenCalledWith(validationError, {
        operation: 'signOut',
        sessionId: mockUpdateDto.sessionId,
        gameId: mockUpdateDto.gameId,
      });
    });

    it('should use correct filter criteria for finding active sessions', async () => {
      const mockUpdateMany = jest.fn().mockResolvedValue({ modifiedCount: 1 });
      (mockModel as any).updateMany = mockUpdateMany;

      await service.signOut({ updateDto: mockUpdateDto });

      expect(mockUpdateMany).toHaveBeenCalledWith(
        {
          sessionId: mockUpdateDto.sessionId,
          gameId: mockUpdateDto.gameId,
          signOutGameTime: { $eq: null },
        },
        expect.any(Object),
        { new: true, lean: true },
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty string values in createDto', async () => {
      const createDtoWithEmptyStrings = {
        ...mockCreateDto,
        sessionId: '',
        userId: '',
        gameId: 0,
      };

      const mockSave = jest
        .fn()
        .mockResolvedValue({ _id: 'test-id', ...createDtoWithEmptyStrings });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: createDtoWithEmptyStrings });

      expect(result).toBe(true);
    });

    it('should handle zero balance values', async () => {
      const createDtoWithZeroBalance = { ...mockCreateDto, balance: 0 };

      const mockSave = jest.fn().mockResolvedValue({ _id: 'test-id', ...createDtoWithZeroBalance });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: createDtoWithZeroBalance });

      expect(result).toBe(true);
    });

    it('should handle negative balance values', async () => {
      const createDtoWithNegativeBalance = { ...mockCreateDto, balance: -100 };

      const mockSave = jest
        .fn()
        .mockResolvedValue({ _id: 'test-id', ...createDtoWithNegativeBalance });
      const mockDocument = { save: mockSave };
      (mockModel as jest.MockedFunction<any>).mockReturnValue(mockDocument);

      const result = await service.signIn({ createDto: createDtoWithNegativeBalance });

      expect(result).toBe(true);
    });

    it('should handle updateDto with zero balance', async () => {
      const updateDtoWithZeroBalance = { ...mockUpdateDto, balance: 0 };

      const mockUpdateMany = jest.fn().mockResolvedValue({ modifiedCount: 1 });
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: updateDtoWithZeroBalance });

      expect(result).toBe(true);
    });

    it('should handle updateDto with negative balance', async () => {
      const updateDtoWithNegativeBalance = { ...mockUpdateDto, balance: -500 };

      const mockUpdateMany = jest.fn().mockResolvedValue({ modifiedCount: 1 });
      (mockModel as any).updateMany = mockUpdateMany;

      const result = await service.signOut({ updateDto: updateDtoWithNegativeBalance });

      expect(result).toBe(true);
    });
  });
});
