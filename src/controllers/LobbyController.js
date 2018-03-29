import joi from 'joi'
import dateFormat from 'date-fns/format'

import { Lobby } from '../models/Lobby'

const lobbySchema = joi.object({
    id: joi
        .number()
        .integer(),
    console: joi
        .string()
        .required(),
    size: joi
        .number()
        .integer()
        .required(),
    game: joi
        .string()
        .required()
})

class LobbyController {
    async index(ctx) {
        const query = ctx.query
        const lobby = new Lobby()

        //Let's check that the sort options were set. Sort can be empty
        // if (!query.order || !query.page || !query.limit) {
        //     ctx.throw(400, 'INVALID_ROUTE_OPTIONS')
        // }

        //Get paginated list of lobbys
        try {
            let result = await lobby.all()
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA_NO_ID')

        //Initialize lobby
        const lobby = new Lobby()

        try {
            //Find and show lobby
            let result = await lobby.find(params.id)
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const request = ctx.request.body

        //Attach logged in lobby
        const lobby = new Lobby(request)
        console.log(lobby)

        try {
            let result = await lobby.store()
            ctx.body = { message: 'SUCCESS', id: result }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async update(ctx) {
        const params = ctx.params
        const request = ctx.request.body

        //Make sure they've specified a lobby
        if (!params.id) ctx.throw(400, 'INVALID_DATA_NO_ID')

        //Find and set that lobby
        const lobby = new Lobby(params)
        console.log('params.id',params.id)
        let result = await lobby.find(params.id)
        if (!result) ctx.throw(400, 'INVALID_DATA')
        console.log('result',result)

        //Add the updated date value
        //lobby.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

        //Replace the lobby data with the new updated lobby data
        Object.keys(ctx.request.body).forEach(function(parameter, index) {
            lobby[parameter] = request[parameter]
        })

        try {
            await lobby.save()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA_COULDNT_SAVE')
        }
    }

    async delete(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Find that lobby
        const lobby = new Lobby(params)
        await lobby.find(params.id)
        if (!lobby) ctx.throw(400, 'INVALID_DATA')

        try {
            await lobby.destroy()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default LobbyController
