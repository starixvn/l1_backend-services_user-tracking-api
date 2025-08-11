import { IsString, IsBoolean, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  @IsString()
  readonly ssoToken: string;

  @IsString()
  readonly sessionId: string;

  @IsOptional()
  @IsString()
  readonly owSeq?: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly memberId: string;

  @IsDate()
  @Type(() => Date)
  readonly ssoTime: Date;

  @IsDate()
  @Type(() => Date)
  readonly recheckInTime: Date;

  @IsString()
  readonly ip: string;

  @IsString()
  readonly browserUserAgent: string;

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
  readonly partnerId: string;

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
}
