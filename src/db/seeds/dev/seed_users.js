//I only want migrations, rollbacks, and seeds to run when the NODE_ENV is specified
//in the knex seed/migrate command. Knex will error out if it is not specified.
if (!process.env.NODE_ENV) { throw new Error('NODE_ENV not set') }

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') { throw new Error('Can\'t run seeds in production') }

const faker = require('faker')

exports.seed = function(knex, Promise) {
    return knex('users').del()
    .then(function(){
        let seedData = []
        for (let i = 0; i < 5; i++) {

            if (i === 0) {
                let testUser = {
                steamId: 'demoSteamId',
                lobbyId: 12345
                }
                seedData.push(testUser)
                continue
            }

            let testUser = {
            steamId: faker.internet.userName(),
            lobbyId: faker.random.number()
            }
            seedData.push(testUser)
        }

        //Insert users
        console.log(seedData)
        return knex('users').insert(seedData)
        })
}