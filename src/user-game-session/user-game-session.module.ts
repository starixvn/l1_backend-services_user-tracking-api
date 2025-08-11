import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGameSessionController } from './user-game-session.controller';
import { UserGameSessionService } from './user-game-session.service';
import { UserGameSession, UserGameSessionSchema } from './models/user-game-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserGameSession.name, schema: UserGameSessionSchema }]),
  ],
  controllers: [UserGameSessionController],
  providers: [UserGameSessionService],
})
export class UserGameSessionModule {}
