import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateDto, UpdateDto } from './models/user-game-session.dto';

/**
 * Service for user game session business logic.
 */
@Injectable()
export class UserGameSessionService {
  constructor(
    @InjectModel(UserGameSession.name)
    private readonly userGameSessionModel: Model<UserGameSessionDocument>,
  ) {}

  async signIn({ createDto }: { createDto: CreateDto }): Promise<boolean> {
    const createdSession = new this.userGameSessionModel(createDto);
    createdSession.signInGameTime = new Date();
    createdSession.appType = createDto.system;

    return (await createdSession.save()) ? true : false;
  }

  async signOut({ updateDto }: { updateDto: UpdateDto }): Promise<boolean> {
    const createdSession = await this.userGameSessionModel.findOneAndUpdate(
      {
        sessionId: updateDto.sessionId,
        gameId: updateDto.gameId,
        signOutGameTime: { $eq: null },
      },
      { $set: { signOutGameTime: new Date() } },
      { new: true },
    );

    return createdSession ? true : false;
  }
}
