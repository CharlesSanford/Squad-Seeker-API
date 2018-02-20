import db from '../db/db'

class User {
    constructor(data) {
        if (!data) {
            return
        }
        this.id = data.id
        this.steamId = data.steamId
        this.lobbyId = data.lobbyId
    }


    async all() {
        try {
            return await db('users')
                .select('*')
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async find(id) {
        try {
            console.log('id',id)
            return await db('users')
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

    async findBySteamId(steamId) {
        try {
            console.log('steamId',steamId)
            return await db('users')
                .select('*')
                .where({ steamId: steamId })
            if (!result) return {}
            console.log(this.constructor(result))
            this.constructor(result)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async findByLobbyId(lobbyId) {
        try {
            console.log('lobbyId',lobbyId)
            return await db('users')
                .select('*')
                .where({ lobbyId: lobbyId })
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
            return await db('users').insert(this)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async save() {
        try {
            return await db('users')
                .update(this)
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async destroy(request) {
        try {
            return await db('users')
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
        return db('users')
            .select('*')
            .where({ id: id })
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}


export { User, findById }
