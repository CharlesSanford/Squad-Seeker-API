import db from '../db/db'

class User {
    constructor(data) {
        if (!data) {
            return
        }

        this.id = data.id
        this.token = data.token
        this.username = data.username
        this.email = data.email
        this.isAdmin = data.isAdmin
        this.lobbyId = data.lobbyId
    }

    async find(id) {
        try {
            return await db('users')
                .select('id', 'username', 'email', 'isAdmin', 'lobbyId')
                .where({ id: id })
            if (!result) return {}
            console.log(this.constructor(result))
            this.constructor(result)
            return userData
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
}

async function findById(id) {
    try {
        const [userData] = db('users')
            .select('id', 'token', 'username', 'email', 'isAdmin')
            .where({ id: id })
        return userData
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}

export { User, findById }