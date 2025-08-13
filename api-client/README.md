# User Tracking API Client

A TypeScript client for the User Tracking API with support for game session management.

## Installation

```bash
npm install @sc/user-tracking-client
```

## Usage

### Basic Setup

```typescript
import { TrackingClient } from '@sc/user-tracking-client';

const client = new TrackingClient('http://localhost:3000');
```

### Sign In

```typescript
import { TrackingClient, SignInReq } from '@sc/user-tracking-client';

const client = new TrackingClient('http://localhost:3000');

const signInData: SignInReq = {
  sessionId: 'session-123',
  browserUserAgent: 'Mozilla/5.0...',
  ip: '192.168.1.1',
  siteId: 'site-789',
  userId: 'user-101',
  language: 'en',
  currencyCode: 'USD',
  currencyName: 'US Dollar',
  currencyGroupId: 'group-1',
  isTestCurrency: false,
  multiplier: 1,
  memberName: 'Test Member',
  siteName: 'Test Site',
  system: 1,
  operatorId: 'op-303',
  playerId: 'player-404',
  playerName: 'Test Player',
  characterName: 'Test Character',
  disableJackpotGames: false,
  operatorToken: 'token-505',
  disableAward: false,
  gameId: 1001,
  gameConfigType: 1,
  balance: 1000,
};

try {
  const result = await client.signIn(signInData);
  if (result.errorCode === 0) {
    console.log('Sign in successful:', result.message);
  } else {
    console.error('Sign in failed:', result.message);
  }
} catch (error) {
  console.error('Network error:', error);
}
```

### Sign Out

```typescript
import { TrackingClient, SignOutReq } from '@sc/user-tracking-client';

const client = new TrackingClient('http://localhost:3000');

const signOutData: SignOutReq = {
  sessionId: 'session-123',
  gameId: 1001,
  balance: 1500,
};

try {
  const result = await client.signOut(signOutData);
  if (result.errorCode === 0) {
    console.log('Sign out successful:', result.message);
  } else {
    console.error('Sign out failed:', result.message);
  }
} catch (error) {
  console.error('Network error:', error);
}
```

### Custom Configuration

```typescript
import { TrackingClient } from '@sc/user-tracking-client';

const client = new TrackingClient('http://localhost:3000', {
  timeout: 60000,
  headers: {
    Authorization: 'Bearer your-token',
    'Custom-Header': 'custom-value',
  },
});
```

## API Reference

### TrackingClient

Main client class for interacting with the User Tracking API.

#### Constructor

```typescript
constructor(baseURL: string, config?: AxiosRequestConfig)
```

- `baseURL`: Base URL for the API
- `config`: Optional axios configuration

#### Methods

##### signIn(data: SignInReq): Promise<ApiResp>

Creates a new user game session.

##### signOut(data: SignOutReq): Promise<ApiResp>

Updates an existing user game session.

### Types

#### SignInReq

Interface for sign-in request data.

#### SignOutReq

Interface for sign-out request data.

#### ApiResp

Interface for API response data.

- `errorCode`: 0 for success, 1 for failure
- `message`: Descriptive message about the operation result

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run build:watch
```

### Lint

```bash
npm run lint
npm run lint:fix
```
