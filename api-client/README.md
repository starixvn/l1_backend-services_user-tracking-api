# API Client

This directory contains the automatically generated API client using `@hey-api/openapi-ts`.

## Files

- `src/index.ts` - Main export file
- `src/sdk.gen.ts` - Generated SDK functions
- `src/types.gen.ts` - Generated TypeScript types
- `src/client.gen.ts` - Generated HTTP client
- `src/core/` - Core utilities
- `src/client/` - Client implementation

## Usage Example

### Local Development

```typescript
import { createClient } from './src/client';
import {
  userGameSessionControllerInsertUserGameSession,
  healthCheckControllerHealthCheck,
} from './src/sdk.gen';

// Initialize the client
const client = createClient({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: 'Bearer your-token-here',
  },
});

// Example: Create a user game session
const createSession = async () => {
  try {
    const response = await userGameSessionControllerInsertUserGameSession({
      client,
      data: {
        userId: 'user123',
        gameId: 'game456',
        sessionData: {
          startTime: new Date().toISOString(),
          // ... other session data
        },
      },
    });

    console.log('Session created:', response.data);
  } catch (error) {
    console.error('Error creating session:', error);
  }
};

// Example: Check API health
const checkHealth = async () => {
  try {
    const response = await healthCheckControllerHealthCheck({
      client,
    });

    console.log('API Health:', response.data);
  } catch (error) {
    console.error('Error checking health:', error);
  }
};
```

### Published Package Usage

After publishing the package, you can use it in other projects:

```bash
npm install @user-tracking/api-client
```

```typescript
import { createClient } from '@user-tracking/api-client';
import {
  userGameSessionControllerInsertUserGameSession,
  healthCheckControllerHealthCheck,
} from '@user-tracking/api-client';

const client = createClient({
  baseURL: 'https://your-api-domain.com',
  headers: {
    Authorization: 'Bearer your-token-here',
  },
});

// Use the same functions as above
```

## Regeneration

To regenerate this client after API changes:

1. Start your NestJS application: `npm run start:dev`
2. Run: `npm run generate:api-client`

For development with auto-regeneration: `npm run generate:api-client:dev`

## Publishing

To publish this package:

1. Build the package: `npm run build`
2. Publish to npm: `npm publish`
