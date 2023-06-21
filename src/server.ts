import Fastify from 'fastify' // Importing from fastify module
import cors from '@fastify/cors'
import { appRoutes } from './routes';
import { notificationRoutes } from './notifications-routes';

const app = Fastify() // Creating a fastify instance

app.register(cors) // Without config, everything can access the backend app
app.register(appRoutes)
<<<<<<< HEAD
=======
app.register(notificationRoutes)

>>>>>>> c4639df7579295e0adf1111f5efbb1d034e937ad
app.listen({
    port: 3333,
    host: '0.0.0.0' //Fastify by default doesn't allow connections from IP. Only localhost device (Not working Expo Go External Devices)
}).then(() => {
    console.log('HTTP server listening on port 3333...')
})