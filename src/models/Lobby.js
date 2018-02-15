import db from '../db/db'

class Lobby {
    constructor(data) {
        if (!data) {
            return
        }
        this.lobbyId = data.lobbyId
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

    async find(lobbyId) {
        try {
            //console.log('lobbyId',lobbyId)
            return await db('lobby')
                .select('*')
                .where({ lobbyId: lobbyId })
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
                .where({ lobbyId: this.lobbyId })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async destroy(request) {
        try {
            return await db('lobby')
                .delete()
                .where({ lobbyId: this.lobbyId })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }


}

async function findById(lobbyId) {
    try {
        //console.log(lobbyId)
        return db('lobby')
            .select('*')
            .where({ lobbyId: lobbyId })
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}


export { Lobby, findById }
