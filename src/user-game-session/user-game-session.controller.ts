import { Body, Controller, Post } from '@nestjs/common';
import { UserGameSessionService } from './user-game-session.service';
import { CreateUserGameSessionDto } from './models/user-game-session.dto';

/**
 * Controller for user game session operations.
 */
@Controller('user-game-session')
export class UserGameSessionController {
  constructor(private readonly userGameSessionService: UserGameSessionService) {}

  /**
   * Insert a new user game session.
   */
  @Post()
  async insertUserGameSession(@Body() createUserGameSessionDto: CreateUserGameSessionDto) {
    return this.userGameSessionService.saveUserGameSession({ createUserGameSessionDto });
  }
}
