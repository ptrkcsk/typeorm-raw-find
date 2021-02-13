# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
1. Run `docker-compose up` command
1. Run `npm run typeorm schema:sync` command
1. Run `npm start` command, which executes [`./src/index.ts`](./src/index.ts)
1. Notice that the parameterized query succeeds without quotes, but fails with quotes
