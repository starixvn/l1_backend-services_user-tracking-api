import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user_game_sessions' })
export class UserGameSession {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  siteId: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  browserUserAgent: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  currencyCode: string;

  @Prop({ required: true })
  currencyName: string;

  @Prop({ required: true })
  currencyGroupId: string;

  @Prop({ required: true })
  isTestCurrency: boolean;

  @Prop({ required: true })
  multiplier: number;

  @Prop({ required: true })
  memberName: string;

  @Prop({ required: true })
  siteName: string;

  @Prop({ required: true })
  system: number;

  @Prop({ required: true })
  operatorId: string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true })
  characterName: string;

  @Prop({ required: true })
  disableJackpotGames: boolean;

  @Prop({ required: true })
  operatorToken: string;

  @Prop({ required: true })
  disableAward: boolean;

  @Prop({ required: true })
  appType: number;

  @Prop({ required: true })
  gameId: number;

  @Prop({ required: true })
  gameConfigType: number;

  @Prop({ required: true })
  signInGameTime: Date;

  @Prop()
  signOutGameTime: Date;
}

export type UserGameSessionDocument = UserGameSession & Document;
export const UserGameSessionSchema = SchemaFactory.createForClass(UserGameSession);
