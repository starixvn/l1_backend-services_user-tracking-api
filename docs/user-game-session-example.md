# User Game Session API Example

## Endpoint

`POST /user-game-session`

## Request Body Example

```json
{
  "ssoToken": "d05f1557-06a2-4b36-9c9f-30a80608cc96",
  "sessionId": "tLvCKJxi10nAzekWPLzhbfPduOJwTyYf_ONEworksVGCash_880",
  "owSeq": null,
  "username": "ONEworksVGCash_880",
  "memberId": "880",
  "ssoTime": "2025-08-11T02:38:17.558Z",
  "recheckInTime": "2025-08-11T02:40:05.286Z",
  "ip": "10.10.50.123",
  "browserUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  "siteId": "4100300",
  "userId": "68995799e891f774acbdd6b1",
  "language": "vi-VN",
  "currencyCode": "VND",
  "currencyName": "UUS",
  "currencyGroupId": "61b953ad815d6c000196a14c",
  "isTestCurrency": true,
  "multiplier": 1000,
  "partnerId": "ONEworksVGCash",
  "memberName": "username_880",
  "siteName": "brian",
  "system": 1,
  "operatorId": "ONEworksVGCash",
  "playerId": "880",
  "playerName": "username_880",
  "disableJackpotGames": false,
  "operatorToken": "ONEworksVGCashToken",
  "disableAward": false,
  "gameId": 123,
  "gameConfigType": 1
}
```

## Response Examples

### Success Response (201 Created)

```json
{
  "errorCode": 0,
  "message": "created new user game session"
}
```

### Error Response (4xx/5xx)

```json
{
  "errorCode": 400,
  "message": "Validation failed",
  "errors": ["ssoToken should not be empty"]
}
```

## Notes

- All fields are required unless specified as optional in the API documentation.
- `ssoTime` and `recheckInTime` must be ISO 8601 date strings (e.g., "2025-08-11T02:38:17.558Z").
- `gameId` and `gameConfigType` are required number fields.
- The API will automatically convert date strings to Date objects during validation.
- Success responses return HTTP 201 status with errorCode 0.
- Error responses maintain the existing error format with appropriate errorCode and message.
