import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGameSession, UserGameSessionDocument } from './models/user-game-session.schema';
import { CreateUserGameSessionDto } from './models/user-game-session.dto';

/**
 * Service for user game session business logic.
 */
@Injectable()
export class UserGameSessionService {
  constructor(
    @InjectModel(UserGameSession.name)
    private readonly userGameSessionModel: Model<UserGameSessionDocument>,
  ) {}

  async saveUserGameSession({
    createUserGameSessionDto,
  }: {
    createUserGameSessionDto: CreateUserGameSessionDto;
  }): Promise<UserGameSession> {
    const createdSession = new this.userGameSessionModel(createUserGameSessionDto);

    return createdSession.save();
  }
}
