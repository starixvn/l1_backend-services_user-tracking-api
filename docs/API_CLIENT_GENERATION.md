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
- Output the generated client to `api-client/src/`

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
- **Output**: `api-client/src/` directory
- **Features**:
  - Full TypeScript support with generated types
  - Axios-based HTTP client
  - Modular SDK structure

## Usage

After generating the API client, you can import and use it in your code:

```typescript
import { createClient } from '../api-client/src/client';
import { userGameSessionControllerInsertUserGameSession } from '../api-client/src/sdk.gen';

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

## Publishing the API Client Package

The API client is structured as a separate npm package in the `api-client/` directory. To publish it:

1. **Build the package**:

   ```bash
   cd api-client
   npm run build
   ```

2. **Publish to npm**:

   ```bash
   npm publish
   ```

3. **Install in other projects**:
   ```bash
   npm install @user-tracking/api-client
   ```

## Notes

- The generated API client files are automatically ignored by git (see `.gitignore`)
- Always regenerate the client after making changes to your API endpoints
- The generated client provides full TypeScript support with proper types for requests and responses
- The package can be published independently and used in other projects
