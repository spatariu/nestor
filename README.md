Installation:

- run `docker-compose up -d` in the root to get mysql and phpmyadmin containers running
- run in the `backend` folder the `npm start` command to start the server on locahost:3000
- run in the `frontend` folder the `npm start` command to start the server on locahost:3001

- for database run:
`npx prisma migrate dev --name init`
`npx prisma generate`
`npm run seed`