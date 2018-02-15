import Router from 'koa-router'
import logger from '../logs/log'

import LobbyController from '../controllers/LobbyController'

const router = new Router()

const lobbyController = new LobbyController()

router.get('/api/v1/lobby', async (ctx, next) => {
    await lobbyController.index(ctx)
})

router.post('/api/v1/lobby', async (ctx, next) => {
    await lobbyController.create(ctx)
})

router.get('/api/v1/lobby/:lobbyId', async (ctx, next) => {
    await lobbyController.show(ctx)
})

router.put('/api/v1/lobby/:lobbyId', async (ctx, next) => {
    await lobbyController.update(ctx)
})

router.delete('/api/v1/lobby/:lobbyId', async (ctx, next) => {
    await lobbyController.delete(ctx)
})

export default router
