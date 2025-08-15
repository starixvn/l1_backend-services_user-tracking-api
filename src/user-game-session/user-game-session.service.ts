import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateDto, UpdateDto } from './models/user-game-session.dto';
import { LoggerService } from '../core/logger/logger.service';

@Injectable()
export class UserGameSessionService {
  constructor(
    @InjectModel(UserGameSession.name)
    private readonly userGameSessionModel: Model<UserGameSessionDocument>,
    private readonly loggerService: LoggerService,
  ) {}

  async signIn({ createDto }: { createDto: CreateDto }): Promise<boolean> {
    try {
      const createdSession = new this.userGameSessionModel(createDto);
      createdSession.signInGameTime = new Date();
      createdSession.appType = createDto.system;
      createdSession.signInBalance = createDto.balance ?? 0;

      const savedSession = await createdSession.save();

      if (savedSession) {
        return true;
      }

      this.loggerService.captureMessage('Failed to save user game session', 'warning', {
        sessionId: createDto.sessionId,
        gameId: createDto.gameId,
      });

      return false;
    } catch (error) {
      this.loggerService.captureException(error, {
        operation: 'signIn',
        sessionId: createDto.sessionId,
        gameId: createDto.gameId,
        userId: createDto.userId,
      });

      return false;
    }
  }

  async signOut({ updateDto }: { updateDto: UpdateDto }): Promise<boolean> {
    try {
      const updatedSession = await this.userGameSessionModel.updateMany(
        {
          sessionId: updateDto.sessionId,
          gameId: updateDto.gameId,
          signOutGameTime: { $eq: null },
        },
        { $set: { signOutGameTime: new Date(), signOutBalance: updateDto.balance ?? 0 } },
        { new: true, lean: true },
      );

      return updatedSession ? true : false;
    } catch (error) {
      this.loggerService.captureException(error, {
        operation: 'signOut',
        sessionId: updateDto.sessionId,
        gameId: updateDto.gameId,
      });

      return false;
    }
  }
}
