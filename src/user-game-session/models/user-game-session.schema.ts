import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user-game-sessions' })
export class UserGameSession {
  @Prop({ required: true })
  ssoToken: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop()
  owSeq?: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  memberId: string;

  @Prop({ required: true })
  ssoTime: Date;

  @Prop({ required: true })
  recheckInTime: Date;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  browserUserAgent: string;

  @Prop({ required: true })
  siteId: string;

  @Prop({ required: true })
  userId: string;

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
  partnerId: string;

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
  disableJackpotGames: boolean;

  @Prop({ required: true })
  operatorToken: string;

  @Prop({ required: true })
  disableAward: boolean;

  @Prop({ required: true })
  gameId: number;

  @Prop({ required: true })
  gameConfigType: number;
}

export type UserGameSessionDocument = UserGameSession & Document;
export const UserGameSessionSchema = SchemaFactory.createForClass(UserGameSession);
