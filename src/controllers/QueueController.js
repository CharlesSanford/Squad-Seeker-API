import joi from 'joi'
import dateFormat from 'date-fns/format'

import { Queue } from '../models/Queue'

const queueSchema = joi.object({
    id: joi
        .number()
        .integer(),
    userId: joi
        .number()
        .integer()
        .required(),
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

class QueueController {
    async index(ctx) {
        const query = ctx.query
        const queue = new Queue()

        //Let's check that the sort options were set. Sort can be empty
        // if (!query.order || !query.page || !query.limit) {
        //     ctx.throw(400, 'INVALID_ROUTE_OPTIONS')
        // }

        //Get paginated list of queues
        try {
            let result = await queue.all()
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA_NO_ID')

        //Initialize queue
        const queue = new Queue()

        try {
            //Find and show queue
            let result = await queue.find(params.id)
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const request = ctx.request.body

        //Attach logged in queue
        const queue = new Queue(request)
        console.log(queue)


        //Validate the newly created queue
        // const validator = joi.validate(queue, queueSchema)
        // if (validator.error) ctx.throw(400, validator.error.details[0].message)

        try {
            let result = await queue.store()
            ctx.body = { message: 'SUCCESS', id: result }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async update(ctx) {
        const params = ctx.params
        const request = ctx.request.body

        //Make sure they've specified a queue
        if (!params.id) ctx.throw(400, 'INVALID_DATA_NO_ID')

        //Find and set that queue
        const queue = new Queue(params)
        console.log('params.id',params.id)
        let result = await queue.find(params.id)
        if (!result) ctx.throw(400, 'INVALID_DATA')
        console.log('result',result)

        //Add the updated date value
        //queue.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

        //Replace the queue data with the new updated queue data
        Object.keys(ctx.request.body).forEach(function(parameter, index) {
            queue[parameter] = request[parameter]
        })

        try {
            await queue.save()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA_COULDNT_SAVE')
        }
    }

    async delete(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Find that queue
        const queue = new Queue(params)
        await queue.find(params.id)
        if (!queue) ctx.throw(400, 'INVALID_DATA')

        try {
            await queue.destroy()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async deleteBySteamId(ctx) {
        const params = ctx.params
        if (!params.steamId) ctx.throw(400, 'INVALID_DATA_NO_STEAM_ID')
        const queue = new Queue(params)

        try {
            await queue.deleteBySteamId(params.steamId)
            ctx.body = { message: 'SUCCESSFULLY_DELETED' }

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default QueueController
