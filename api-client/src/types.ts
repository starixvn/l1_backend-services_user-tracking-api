export interface SignInReq {
  sessionId: string;
  browserUserAgent: string;
  ip: string;
  siteId: string;
  userId: string;
  language: string;
  currencyCode: string;
  currencyName: string;
  currencyGroupId: string;
  isTestCurrency: boolean;
  multiplier: number;
  memberName: string;
  siteName: string;
  system: number;
  operatorId: string;
  playerId: string;
  playerName: string;
  characterName: string;
  disableJackpotGames: boolean;
  operatorToken: string;
  disableAward: boolean;
  gameId: number;
  gameConfigType: number;
  balance?: number;
}

export interface SignOutReq {
  sessionId: string;
  gameId: number;
  balance?: number;
}

export interface ApiResp {
  errorCode: number;
  message: string;
}
