import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
  async insertUserGameSession(@Body() createUserGameSessionDto: CreateUserGameSessionDto) {
    await this.userGameSessionService.saveUserGameSession({ createUserGameSessionDto });
    return {
      errorCode: 0,
      message: 'created new user game session',
    };
  }
}
