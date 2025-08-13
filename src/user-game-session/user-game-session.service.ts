import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateDto, UpdateDto } from './models/user-game-session.dto';
import { LoggerService } from '../core/logger/logger.service';

/**
 * Service for user game session business logic.
 */
@Injectable()
export class UserGameSessionService {
  constructor(
    @InjectModel(UserGameSession.name)
    private readonly userGameSessionModel: Model<UserGameSessionDocument>,
    private readonly loggerService: LoggerService,
  ) {}

  async signIn({ createDto }: { createDto: CreateDto }): Promise<boolean> {
    try {
      this.loggerService.addBreadcrumb('Starting sign-in process', 'user-game-session', 'info', {
        sessionId: createDto.sessionId,
        gameId: createDto.gameId,
      });

      const createdSession = new this.userGameSessionModel(createDto);
      createdSession.signInGameTime = new Date();
      createdSession.appType = createDto.system;

      const savedSession = await createdSession.save();

      if (savedSession) {
        this.loggerService.addBreadcrumb('Sign-in successful', 'user-game-session', 'info', {
          sessionId: createDto.sessionId,
          gameId: createDto.gameId,
        });
        return true;
      } else {
        this.loggerService.captureMessage('Failed to save user game session', 'error', {
          sessionId: createDto.sessionId,
          gameId: createDto.gameId,
        });
        return false;
      }
    } catch (error) {
      this.loggerService.captureException(error, {
        operation: 'signIn',
        sessionId: createDto.sessionId,
        gameId: createDto.gameId,
        userId: createDto.userId,
      });

      this.loggerService.addBreadcrumb(
        'Sign-in failed with exception',
        'user-game-session',
        'error',
        {
          sessionId: createDto.sessionId,
          error: error.message,
        },
      );

      return false;
    }
  }

  async signOut({ updateDto }: { updateDto: UpdateDto }): Promise<boolean> {
    try {
      this.loggerService.addBreadcrumb('Starting sign-out process', 'user-game-session', 'info', {
        sessionId: updateDto.sessionId,
        gameId: updateDto.gameId,
      });

      const updatedSession = await this.userGameSessionModel.findOneAndUpdate(
        {
          sessionId: updateDto.sessionId,
          gameId: updateDto.gameId,
          signOutGameTime: { $eq: null },
        },
        { $set: { signOutGameTime: new Date() } },
        { new: true },
      );

      if (updatedSession) {
        this.loggerService.addBreadcrumb('Sign-out successful', 'user-game-session', 'info', {
          sessionId: updateDto.sessionId,
          gameId: updateDto.gameId,
        });
        return true;
      } else {
        this.loggerService.captureMessage('Failed to find session for sign-out', 'error', {
          sessionId: updateDto.sessionId,
          gameId: updateDto.gameId,
        });
        return false;
      }
    } catch (error) {
      this.loggerService.captureException(error, {
        operation: 'signOut',
        sessionId: updateDto.sessionId,
        gameId: updateDto.gameId,
      });

      this.loggerService.addBreadcrumb(
        'Sign-out failed with exception',
        'user-game-session',
        'error',
        {
          sessionId: updateDto.sessionId,
          error: error.message,
        },
      );

      return false;
    }
  }
}
