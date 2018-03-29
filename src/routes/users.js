import Router from 'koa-router'
import logger from '../logs/log'
import jwt from '../middleware/jwt'
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })


import UserController from '../controllers/UserController'

const router = new Router()

const userController = new UserController()

router.post('/api/v1/user/signup', async (ctx, next) => {
    await userController.signup(ctx)
})

router.post('/api/v1/user/authenticate', async (ctx, next) => {
    await userController.authenticate(ctx)
})

router.post('/api/v1/user/refreshAccessToken', async (ctx, next) => {
    await userController.refreshAccessToken(ctx)
})

router.post(
    '/api/v1/user/invalidateAllRefreshTokens',
    jwtMiddleware,
    async (ctx, next) => {
        await userController.invalidateAllRefreshTokens(ctx)
    }
)

router.post(
    '/api/v1/user/invalidateRefreshToken',
    jwtMiddleware,
    async (ctx, next) => {
        await userController.invalidateRefreshToken(ctx)
    }
)

router.post('/api/v1/user/forgot', async (ctx, next) => {
    await userController.forgot(ctx)
})

router.post('/api/v1/user/checkPasswordResetToken', async (ctx, next) => {
    await userController.checkPasswordResetToken(ctx)
})

router.post('/api/v1/user/resetPassword', async (ctx, next) => {
    await userController.resetPassword(ctx)
})

router.post('/api/v1/user/private', jwtMiddleware, async (ctx, next) => {
    await userController.private(ctx)
})

router.put('/api/v1/user/:id', jwtMiddleware, async (ctx, next) => {
    await userController.update(ctx)
})

router.get('/api/v1/user/:id', jwtMiddleware, async (ctx, next) => {
    await userController.fetch(ctx)
})


// router.get('/api/v1/users', async (ctx, next) => {
//     await userController.index(ctx)
// })

// router.post('/api/v1/users', async (ctx, next) => {
//     await userController.create(ctx)
// })

// router.get('/api/v1/users/:id', async (ctx, next) => {
//     await userController.show(ctx)
// })

// router.get('/api/v1/users/lobby/:lobbyId', async (ctx, next) => {
//     await userController.showByLobbyId(ctx)
// })

// router.get('/api/v1/users/steam/:steamId', async (ctx, next) => {
//     await userController.showBySteamId(ctx)
// })

// router.put('/api/v1/users/:id', async (ctx, next) => {
//     await userController.update(ctx)
// })

// router.delete('/api/v1/users/:id', async (ctx, next) => {
//     await userController.delete(ctx)
// })

export default router
