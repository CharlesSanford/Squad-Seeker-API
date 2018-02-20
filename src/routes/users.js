import Router from 'koa-router'
import logger from '../logs/log'

import UserController from '../controllers/UserController'

const router = new Router()

const userController = new UserController()

router.get('/api/v1/users', async (ctx, next) => {
    await userController.index(ctx)
})

router.post('/api/v1/users', async (ctx, next) => {
    await userController.create(ctx)
})

router.get('/api/v1/users/:id', async (ctx, next) => {
    await userController.show(ctx)
})

router.get('/api/v1/users/lobby/:lobbyId', async (ctx, next) => {
    await userController.showByLobbyId(ctx)
})

router.get('/api/v1/users/steam/:steamId', async (ctx, next) => {
    await userController.showBySteamId(ctx)
})

router.put('/api/v1/users/:id', async (ctx, next) => {
    await userController.update(ctx)
})

router.delete('/api/v1/users/:id', async (ctx, next) => {
    await userController.delete(ctx)
})

export default router
