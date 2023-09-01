# Jest e MongoDB

This repository contains an example of a simple API, that uses mongo as a database, and Jest for testing.

## Packages used for testing:

- **mongodb-memory-server**: Downloads and spins up a real MongoDB server and holds the data in memory;
- **supertest**: Library for testing node.js HTTP servers;

## Instructions

0. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) (optional)
```
npm install --global yarn
```
1. Install Dependencies

```
yarn
```
2. Run Test

```
yarn test
```
3. Run Server

```
# make sure local mongodb server is on, then run:
yarn start
```