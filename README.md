habit-tracker-server
====================
- Server - Habit Tracker App (Web/Mobile)
- Node
- Fastify = {}
- CORS = Access Project Security
- Banco de Dados: Prisma (ORM) -  

> PORTUGUESE NOTES:

PACKAGES:
==========

### fastify
framework para dentro do node, similar ao express, porém, utilizaremos o fastify por estar sendo mais performático que o express e recebendo mais suporte
### @prisma/client
Client do prisma, dependencia para poder acessar o banco de dados dentro da aplicação.

> npx prisma init --datasource-provider SQLite
utilizaremos SQLite (Não MySQL, não postgres, pois o SQLite cria um arquivo local de banco de dados e assim não precisaremos de um docker para subir um banco de dados local)

### @fastify/cors
integração do CORS (Cross Origin Resource Sharing) com o fastify, gerencia quais aplicações podem acessar a aplicação back end

### zod
Validation to routes with types for typescript

### dayjs
DateTime API Library on Typescript

### web-push
> npm i web-push
Allow sending push notifications from back-end to the front-end without requiring the application to be open or third api/aplication/service. Just with service workers.




DEVELOPMENT PACKAGES:
==============

### typescript
linguagem tipada, cobertura e segurança de código. (npx tsc --init)

### tsx 
Permite executarmos arquivos Typescript pelo Node, sem precisar fazer conversão. (Utilizar "npx tsx src/server.ts", ou adicionar um scripts do projeto)

### prisma 
ORM que utilizaremos (Integrado com o Typescript, vai sempre orientar o caminho correto, evitará criar dados e inserir dados que não existem na tabela, já acusará erro caso falte algo, totalmente integrado no nível de desenvolvimento do código)

### prisma-erd-generator @mermaid-js/mermaid-cli
(+ adding to schema.prisma the following code below the prisma client:
    generator erd {
        provider = "prisma-erd-generator"
    }
)

for the end, execute:
> npx prisma generate
This way creates an ERD.svg on the prisma folder, that is a representation of the tables relations.

### seed prisma
1. create the seed.ts code inside of prisma folder
2. adding to package.json, on the prisma atributes what is there for seed execution.

### @types/web-push
> npm i @types/web-push -D
Install also the types of Web-push as Dev Dependecies to TypeScript Intelissense