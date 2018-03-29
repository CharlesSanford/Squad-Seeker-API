import Router from 'koa-router'
import logger from '../logs/log'
import jwt from '../middleware/jwt'
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

import QueueController from '../controllers/QueueController'

const router = new Router()

const queueController = new QueueController()

router.get('/api/v1/queue', jwtMiddleware, async (ctx, next) => {
    await queueController.index(ctx)
})

router.post('/api/v1/queue', jwtMiddleware, async (ctx, next) => {
    await queueController.create(ctx)
})

router.get('/api/v1/queue/:id', jwtMiddleware, async (ctx, next) => {
    await queueController.show(ctx)
})

router.put('/api/v1/queue/:id', jwtMiddleware, async (ctx, next) => {
    await queueController.update(ctx)
})

router.delete('/api/v1/queue/:id', jwtMiddleware, async (ctx, next) => {
    await queueController.delete(ctx)
})

router.delete('/api/v1/queue/steam/:steamId', async (ctx, next) => {
    await queueController.deleteBySteamId(ctx)
})

export default router
