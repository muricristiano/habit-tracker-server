# habit-tracker-server
Server - Habit Tracker App (Web/Mobile)
Banco de Dados: Prisma (ORM) -  

PORTUGUESE NOTES:

Packages:
fastify - framework para dentro do node, similar ao express, porém, utilizaremos o fastify por estar sendo mais performático que o express e recebendo mais suporte
@prisma/client - Client do prisma, dependencia para poder acessar o banco de dados dentro da aplicação.
@fastify/cors - integração do CORS (Cross Origin Resource Sharing) com o fastify, gerencia quais aplicações podem acessar a aplicação back end)

> npx prisma init --datasource-provider SQLite
utilizaremos SQLite (Não MySQL, não postgres, pois o SQLite cria um arquivo local de banco de dados e assim não precisaremos de um docker para subir um banco de dados local)

Packages de Desenvolvimento:
typescript - linguagem tipada, cobertura e segurança de código. (npx tsc --init)
tsx - Permite executarmos arquivos Typescript pelo Node, sem precisar fazer conversão. (Utilizar "npx tsx src/server.ts", ou adicionar um scripts do projeto)
prisma - ORM que utilizaremos (Integrado com o Typescript, vai sempre orientar o caminho correto, evitará criar dados e inserir dados que não existem na tabela, já acusará erro caso falte algo, totalmente integrado no nível de desenvolvimento do código)

 