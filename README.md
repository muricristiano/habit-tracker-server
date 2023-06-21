# habit-tracker-server
This repository contains the server-side code for the Habit Tracker web and mobile application. It is built with Node.js and utilizes various libraries and packages for different functionalities.

## Technologies Used

### Node.js
Node.js is a JavaScript runtime that allows developers to build scalable and high-performance applications on the server-side. It provides an event-driven, non-blocking I/O model that makes it lightweight and efficient.

### Fastify
Fastify is a web framework for Node.js that aims to be highly performant. It is similar to Express but has a focus on speed and low overhead. Fastify provides a robust foundation for building scalable and efficient server applications.

### CORS
CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. The @fastify/cors package integrates CORS functionality into Fastify, enabling the server to handle cross-origin requests securely.

### Prisma
Prisma is an ORM (Object-Relational Mapping) tool that simplifies database access and management. It provides a type-safe and auto-generated query builder for TypeScript and JavaScript applications. In this project, Prisma is used as the database ORM.

### SQLite
SQLite is a lightweight, file-based database engine that doesn't require a separate server process. It is used as the database provider for this application, allowing for easy setup and local development without the need for additional dependencies like MySQL or PostgreSQL.

### Zod
Zod is a TypeScript-first schema validation library. It allows for type-safe validations and ensures that data conforms to specified schemas. In the habit tracker server, Zod is used for validating routes and enforcing type safety.

### Day.js
Day.js is a lightweight and modern JavaScript library for manipulating, parsing, and formatting dates and times. It provides an easy-to-use API for working with dates in TypeScript and JavaScript applications.

## Development Packages
The following development packages are used in this project:

### TypeScript
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It provides static typing, type checking, and advanced tooling support, resulting in improved code quality, maintainability, and developer productivity.

### ts-node
Ts-node is a TypeScript execution engine and REPL (Read-Eval-Print Loop) for Node.js. It allows for running TypeScript files directly without the need for manual compilation. It simplifies the development workflow by eliminating the need for an additional build step.

### Prisma
Prisma is used not only as the ORM but also as a development tool. It integrates seamlessly with TypeScript and provides automatic code generation, type safety, and validation during development. Prisma ensures that the database operations are aligned with the defined schema and helps prevent errors.

### prisma-erd-generator and mermaid-cli
These development packages are used to generate an Entity-Relationship Diagram (ERD) from the Prisma schema. By executing the command npx prisma generate, an ERD.svg file is created in the Prisma folder, providing a visual representation of the table relations.

Seed Prisma
Seed Prisma is a mechanism for populating the database with initial or test data. It involves creating a seed.ts file inside the Prisma folder, which contains the code for seeding the database. Additionally, the necessary configurations are added to the package.json file to enable the execution of the seed script.