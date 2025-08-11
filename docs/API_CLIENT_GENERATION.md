# API Client Generation

This project uses `@hey-api/openapi-ts` to automatically generate TypeScript API clients from the OpenAPI specification.

## Prerequisites

1. Make sure the NestJS application is running on `http://localhost:5000`
2. Ensure the Swagger documentation is accessible at `http://localhost:5000/api-json`

## Available Scripts

### Generate API Client

```bash
npm run generate:api-client
```

This command will:

- Fetch the OpenAPI specification from `http://localhost:5000/api-json`
- Generate a TypeScript API client using axios
- Output the generated client to `api-client/api-client.ts`

### Generate API Client (Watch Mode)

```bash
npm run generate:api-client:dev
```

This command will:

- Watch for changes in the OpenAPI specification
- Automatically regenerate the API client when changes are detected
- Useful during development when API endpoints are being modified

## Configuration

The API client generation uses the following settings:

- **Client**: @hey-api/client-axios
- **Output**: `api-client/` directory
- **Features**:
  - Full TypeScript support with generated types
  - Axios-based HTTP client
  - Modular SDK structure

## Usage

After generating the API client, you can import and use it in your code:

```typescript
import { createClient } from '../api-client/client';
import { userGameSessionControllerInsertUserGameSession } from '../api-client/sdk.gen';

const client = createClient({
  baseURL: 'http://localhost:5000',
});

// Use the generated client methods
const response = await userGameSessionControllerInsertUserGameSession({
  client,
  data: {
    // ... request data
  },
});
```

## Notes

- The generated API client file is automatically ignored by git (see `.gitignore`)
- Always regenerate the client after making changes to your API endpoints
- The generated client provides full TypeScript support with proper types for requests and responses
