### Environment variables

All environment variables are located in .env.example. Make sure to add new variables in .env file

**The .env file should never be tracked with git. Use it for local development but don't commit it.**

### Setup guidelines:

- Install used tools

  1. Docker and docker compose
  2. Node.js and npm
  3. git
  4. npm i -g prisma

- Git clone repository
- cd into cloned directory and run npm i
- Set up environment variables
- Run docker container
  - **Important:** Run docker compose from folder root as there are environment variables set
  - Run either :
    - npm run docker:compose:up
    - docker-compose -f prisma/docker-compose.yml up -d
- prisma deploy
- Start server
  - #### Local development
    - npm run dev
  - #### Server
    - pm2 start pm2.config.js

### Ci/CD
