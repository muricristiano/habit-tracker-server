import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'

const publicKey = 'BO8aXxuTuSWEWhFqNjUcfKld7-I51pIr08KFX6Jvp5_ydCTYC36GP7c4NXEKSaNjUeXbOPCJ4EIra_DXcnx47eU'
const privateKey = 'NkVsLXSvVY2HSLxjkLp7Xjr_VtHyt6aMhP4lrPq337Q'

WebPush.setVapidDetails(
    'http://localhost:3333',
    publicKey,
    privateKey

)

export async function notificationRoutes(app: FastifyInstance){
    app.get('/push/public_key', () => {
        return {
            publicKey
        }
    })

    app.post('/push/register', (request, response) => {
        console.log(request.body)
        return response.status(201).send()
    })

    app.post('/push/send', async (request, response) => {
        console.log(request.body)

        return response.status(201).send()
    })
}