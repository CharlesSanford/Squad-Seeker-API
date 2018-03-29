import db from '../db/db'

class Queue {
    constructor(data) {
        if (!data) {
            return
        }
        this.id = data.id
        this.userId = data.userId
        this.console = data.console
        this.size = data.size
        this.game = data.game
    }


    async all() {
        try {
            return await db('queue')
                .select('*')
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async find(id) {
        try {
            console.log('id',id)
            return await db('queue')
                .select('*')
                .where({ id: id })
            if (!result) return {}
            console.log(this.constructor(result))
            this.constructor(result)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async store() {
        try {
            return await db('queue').insert(this)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async save() {
        try {
            return await db('queue')
                .update(this)
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async destroy(request) {
        try {
            return await db('queue')
                .delete()
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async deleteBySteamId(steamId) {
        try {
            return await db('queue')
                .delete()
                .where({ steamId: steamId })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }


}

async function findById(id) {
    try {
        //console.log(id)
        return db('queue')
            .select('*')
            .where({ id: id })
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}


export { Queue, findById }
