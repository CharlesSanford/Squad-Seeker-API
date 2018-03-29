import db from '../db/db'

class Lobby {
    constructor(data) {
        if (!data) {
            return
        }
        this.id = data.id
        this.console = data.console
        this.size = data.size
        this.game = data.game
    }

    async all() {
        try {
            return await db('lobby')
                .select('*')
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async find(id) {
        try {
            //console.log('id',id)
            return await db('lobby')
                .select('*')
                .where({ id: id })
            if (!result) return {}
            //console.log(this.constructor(result))
            this.constructor(result)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async store() {
        try {
            return await db('lobby').insert(this)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async save() {
        try {
            return await db('lobby')
                .update(this)
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async destroy(request) {
        try {
            return await db('lobby')
                .delete()
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }


}

async function findById(id) {
    try {
        //console.log(id)
        return db('lobby')
            .select('*')
            .where({ id: id })
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}


export { Lobby, findById }
