import joi from 'joi'
import dateFormat from 'date-fns/format'

import { User } from '../models/User'

const userSchema = joi.object({
    id: joi
        .number()
        .integer(),
    steamId: joi
        .string()
        .required(),
    lobbyId: joi
        .number()
        .integer()
})

class UserController {
    async index(ctx) {
        const query = ctx.query
        const user = new User()

        //Let's check that the sort options were set. Sort can be empty
        // if (!query.order || !query.page || !query.limit) {
        //     ctx.throw(400, 'INVALID_ROUTE_OPTIONS')
        // }

        //Get paginated list of users
        try {
            let result = await user.all()
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA_NO_ID')

        //Initialize user
        const user = new User()

        try {
            //Find and show user
            console.log(params.id)
            let result = await user.find(params.id)
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const request = ctx.request.body

        //Attach logged in user
        const user = new User(ctx.state.user)
        request.userId = user.id

        //Validate the newly created user
        const validator = joi.validate(user, userSchema)
        if (validator.error) ctx.throw(400, validator.error.details[0].message)

        try {
            let result = await user.store()
            ctx.body = { message: 'SUCCESS', id: result }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async update(ctx) {
        const params = ctx.params
        const request = ctx.request.body

        //Make sure they've specified a user
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Find and set that user
        const user = new User()
        await user.find(params.id)
        if (!user) ctx.throw(400, 'INVALID_DATA')

        //Add the updated date value
        //user.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

        //Replace the user data with the new updated user data
        Object.keys(ctx.request.body).forEach(function(parameter, index) {
            user[parameter] = request[parameter]
        })

        try {
            await user.save()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async delete(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Find that user
        const user = new User()
        await user.find(params.id)
        if (!user) ctx.throw(400, 'INVALID_DATA')

        try {
            await user.destroy()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default UserController
