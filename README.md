
<h1 align="center">
  <img alt="Tools" src="https://www.integrant.com/wp-content/uploads/2015/02/icon-services-toolstechnologies.png" width="160px" />
</h1>

<h3 align="center">VUTTR - Very Useful Tools to Remember</h3>

<p align="center">A backend challenge by BossaBox</p>

## 💻 About the project

 VUTTR (Very Useful Tools to Remember) is an api that provides a repository to manage tools with their respective names, links, descriptions and tags.

 #### Technologies used

  -  [NodeJS](https://nodejs.org/)
  -  [ExpressJS](https://expressjs.com/)
  -  [Postgres](https://postgresql.org/)
  -  [Sequelize](https://sequelize.org/master/)
  -  [Docker](https://www.docker.com/)
  -  [JWT](https://jwt.io/)
  -  [Redis](https://redis.io/)
  -  [Swagger](https://swagger.io/)
  -  [Jest](https://jestjs.io/)
  -  [Nodemon](https://nodemon.io/)


## 🔧 Installing the project

First, if you don't have postgres and redis, try installing the postgres and redis docker image by following the steps below

### Exemplo:
Assuming you already have docker installed, download the postgres and redis images and set the container parameters

### Download the postgres docker image

#### `docker run --name postgres -e POSTGRES_PASSWORD = docker -p 5432: 5432 -d postgres`

### Download the redis docker image

#### `docker run --name redis -p 6379: 6379 -d -t redis: alpine`

### Start the containers

#### `docker start postgres redis`


Now, assuming you already have Node.JS and any package manager installed

### Clone this repository

#### `git clone https://github.com/gabrielrsp/vuttr.git`

#### cd to the project directory:

### Install dependencies

#### `ex: yarn install`

### Create the .env file:

You need to set the project environment variables setting. If you followed the container configuration, you can follow this example:

##### `APP_URL=http://localhost:3000`
##### `NODE_ENV=development`

##### #Auth

##### `APP_SECRET=vuttrnode`

##### #Database

##### `DB_HOST=localhost`
##### `DB_USER=postgres`
##### `DB_PASS=docker`
##### `DB_NAME=vuttr`

##### #Redis

##### `REDIS_HOST=127.0.0.1`
##### `REDIS_PORT=6379`


### Create the file .env.test

To set up the test environment. you can create a .env.test file using the same example above, changing DB_NAME assigning the name of your database to tests and replacing NODE_ENV=development with NODE_ENV=test

### Connect to the database

Now you need to connect to the database and create another database with the name you gave in the .env credentials. In this example, the database name is "vuttr". For this step, you can use any postgres client interface like PostBird, DBeaver, etc.


### Install dependencies of sequelize-cli

You need to install sequelize command line interface as a developer dependency by passing the "-D" flag to be able to run sequelize commands

#### `yarn add sequelize-cli -D`

### Execute the migrations

Now you can run migrations to create the relationships in the created database

#### `yarn sequelize db:migrate`

### 🚀 Server is ready! You can run it with the command:

#### `yarn dev`

### 📝 To excecute tests:

#### `yarn test`

### 📜 Documentation : http://localhost:3000/swagger

