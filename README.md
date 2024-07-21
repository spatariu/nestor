Project Structure:

/nestor
|-- /backend
|   |-- /src
|   |   |-- /controllers
|   |   |-- /database
|   |   |-- /models
|   |   |-- /routes
|   |   |-- /services
|   |   |-- app.ts
|   |-- Dockerfile
|   |-- package.json
|-- /frontend
|   |-- /src
|   |   |-- /components
|   |   |-- /pages
|   |   |-- /services
|   |   |-- App.jsx
|   |-- Dockerfile
|   |-- package.json
|-- docker-compose.yml

Installation:

- run `docker-compose up -d` in the root to get mysql and phpmyadmin containers running
- run in the `backend` folder the `npm start` command to start the server on locahost:3000
- run `npx sequelize-cli db:seed:all` to seed the db
