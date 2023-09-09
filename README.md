# Jest MongoDB

This repository contains an example of a simple API, that uses mongo as a database, and Jest for testing.

## Packages used for testing:

- **mongodb-memory-server**: Downloads and spins up a real MongoDB server and holds the data in memory;
- **supertest**: Library for testing node.js HTTP servers;

## Instructions

1. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) (optional)
```
npm install --global yarn
```
2. Install Dependencies

```
yarn
```
3. Run Test

```
yarn test
```
4. Run Server

```
# make sure local mongodb server is on, then run:
yarn start
```

# List of API

/API/Projects
```
[GET] /projects
===== Get list of projects

[GET] /projects/:id
===== Get one project by ID

[GET] /projects-sorted
===== Get list of projects in ascending order

[PUT] /projects/:id
===== Update project

[POST] /projects
===== Create project

[DEL] /projects/:id
===== Delete project's account
```

/API/Programmers
```
[GET] /programmers
===== Get list of programmers

[GET] /programmers/:id
===== Get one programmer by ID

[PUT] /programmers/:id
===== Update programmer by ID

[POST] /programmers
===== Create programmer

[DEL] /programmers/:id
===== Delete programmer's account
```