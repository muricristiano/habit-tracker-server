import Fastify from 'fastify' // Importing from fastify module
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const app = Fastify() // Creating a fastify instance
const prisma = new PrismaClient()

app.register(cors) // Without config, everything can access the backend app

app.get('/', async () => { // Routes creation
    const habits = await prisma.habit.findMany({
        where: {
            title: { 
                startsWith: 'Beber'
            }
        }
    })

    return habits
})

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP server listening on port 3333...')
})