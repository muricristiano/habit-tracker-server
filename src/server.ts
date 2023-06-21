import Fastify from 'fastify' // Importing from fastify module
import cors from '@fastify/cors'
import { appRoutes } from './routes';

const app = Fastify() // Creating a fastify instance

app.register(cors) // Without config, everything can access the backend app
app.register(appRoutes)
app.listen({
    port: 3333,
    host: '0.0.0.0' //Fastify by default doesn't allow connections from IP. Only localhost device (Not working Expo Go External Devices)
}).then(() => {
    console.log('HTTP server listening on port 3333...')
})