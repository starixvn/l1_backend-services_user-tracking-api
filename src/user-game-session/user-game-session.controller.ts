import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserGameSessionService } from './user-game-session.service';
import { CreateDto, UpdateDto } from './models/user-game-session.dto';

/**
 * Controller for user game session operations.
 */
@Controller('game')
export class UserGameSessionController {
  constructor(private readonly userGameSessionService: UserGameSessionService) {}

  /**
   * Insert a new user game session.
   */
  @Post('sign-in')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create session' })
  async signIn(@Body() createDto: CreateDto) {
    const result = await this.userGameSessionService.signIn({ createDto });

    if (!result) {
      return {
        errorCode: 1,
        message: 'failed to create user game session',
      };
    }

    return {
      errorCode: 0,
      message: 'created new user game session',
    };
  }

  /**
   * Update a user game session.
   */
  @Post('sign-out')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update session' })
  async signOut(@Body() updateDto: UpdateDto) {
    const result = await this.userGameSessionService.signOut({ updateDto });

    if (!result) {
      return {
        errorCode: 1,
        message: 'failed to update user game session',
      };
    }

    return {
      errorCode: 0,
      message: 'updated user game session',
    };
  }
}
