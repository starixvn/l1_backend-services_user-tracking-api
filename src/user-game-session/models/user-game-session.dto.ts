import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateDto {
  @IsString()
  readonly sessionId: string;

  @IsString()
  readonly browserUserAgent: string;

  @IsString()
  readonly ip: string;

  @IsString()
  readonly siteId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly language: string;

  @IsString()
  readonly currencyCode: string;

  @IsString()
  readonly currencyName: string;

  @IsString()
  readonly currencyGroupId: string;

  @IsBoolean()
  readonly isTestCurrency: boolean;

  @IsNumber()
  readonly multiplier: number;

  @IsString()
  readonly memberName: string;

  @IsString()
  readonly siteName: string;

  @IsNumber()
  readonly system: number;

  @IsString()
  readonly operatorId: string;

  @IsString()
  readonly playerId: string;

  @IsString()
  readonly playerName: string;

  @IsString()
  readonly characterName: string;

  @IsBoolean()
  readonly disableJackpotGames: boolean;

  @IsString()
  readonly operatorToken: string;

  @IsBoolean()
  readonly disableAward: boolean;

  @IsNumber()
  readonly gameId: number;

  @IsNumber()
  readonly gameConfigType: number;

  @IsNumber()
  readonly balance?: number;
}

export class UpdateDto {
  @IsString()
  readonly sessionId: string;

  @IsNumber()
  readonly gameId: number;

  @IsNumber()
  readonly balance?: number;
}
