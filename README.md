
<h1 align="center">
  <img alt="Tools" src="https://www.integrant.com/wp-content/uploads/2015/02/icon-services-toolstechnologies.png" width="160px" />
</h1>

<h3 align="center">VUTTR - Very Useful Tools to Remember</h3>

<p align="center">Desafio Back-end da BossaBox</p>

## 💻 Sobre o projeto

 VUTTR (Very Useful Tools to Remember) é um repositório simples para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

 #### Tecnologias utilizadas

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


## 🔧 Instalando o projeto

Primeiro, se você não possui o postgres e o redis, tente instalar a imagem do docker do postgres e do redis, seguindo as etapas abaixo

### Exemplo:
Supondo que você já tenha o docker instalado, faça o download das imagens postgres e redis e defina os parâmetros do contêiner

### Baixe a imagem do postgres

#### `docker run --name postgres -e POSTGRES_PASSWORD = docker -p 5432: 5432 -d postgres`

### Baixe a imagem do redis

#### `docker run --name redis -p 6379: 6379 -d -t redis: alpine`

### Inicie os contêineres

#### `docker start postgres redis`


Agora, supondo que você já tenha Node.JS e Yarn instalados,

### Clone este repositório

#### `git clone https://github.com/gabrielrsp/vuttr.git`

#### cd no diretório do projeto:

### Instale as dependências

#### `yarn install`

### Crie o arquivo .env:

Você precisa definir a configuração das variáveis de ambiente do projeto. Se você seguiu a configuração do contêiner, poderá seguir este exemplo:


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


### Conecte-se ao banco de dados

Agora, você precisa se conectar ao banco de dados e criar outro banco de dados com o nome que você deu nas credenciais .env. Neste exemplo, o nome do banco de dados é "vuttr". Para esta etapa, você pode usar qualquer interface de cliente do postgres como PostBird, DBeaver, etc.


### Instale a dependência do sequelize-cli

Você precisa instalar a interface da linha de comandos do sequelize como uma dependência do desenvolvedor passando o sinalizador "-D" para poder executar comandos sequelize

#### `yarn add sequelize-cli -D`

### Execute as migrations

Agora você pode executar migrações para criar as relações no banco de dados criado

#### `yarn sequelize db: migrate`

### 🚀 O servidor está pronto! Você pode executá-lo com o comando:

#### `yarn dev`

### 📜 Para acessar a documentação : http://localhost:3000/swagger

