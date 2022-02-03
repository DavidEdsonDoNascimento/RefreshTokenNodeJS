# NodeJS Refresh Token

Basic design featuring the token handling back-end (login|refresh)

- the postgresql database was used

## install

```
npm i
or
yarn
```

## create database in POSTGRESQL:

- CREATE DATABASE refreshtoken;
- add database string in .env

## run migrations:

```
yarn prisma migrate dev
```

## run project:

```
yarn dev
```

## Existing routes:

- /users (method **POST** and BODY name|username|password): route for user creation
- /login (method **POST** and BODY username|password): route to user login
- /refresh-token (method **POST** and BODY refresh_token(parameter refreshToken.id returned from the /login route)): route for the token refresh
- /courses (method **GET** and Bearer Token returned from the /refresh-token route): example route where only authenticated users are allowed to access
