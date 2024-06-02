# NodeJS Refresh Token

Basic design with token handling backend (login|update)

This is a good project to use as an example for future projects, the structure of Controllers, Services and Models was used, in addition to separating the routes in ./routes

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
