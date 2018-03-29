//I only want migrations, rollbacks, and seeds to run when the NODE_ENV is specified
//in the knex seed/migrate command. Knex will error out if it is not specified.
if (!process.env.NODE_ENV) { throw new Error('NODE_ENV not set') }

exports.up = function(knex, Promise) {
    return knex.schema.createTable('queue', function(table) {
        table.increments('id').primary()
        table
            .integer('userId')
            .unsigned()
            .notNullable()
            .unique()
            .references('id').inTable('users')
        table
            .string('console')
            .notNullable()
        table
            .integer('size')
            .notNullable()
        table
            .string('game')
            .notNullable()
        // maybe use these later if problems arise with timing
        // table.timestamp('updatedAt').nullable()
        // table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex, Promise) {
    //We never want to drop tables in production
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('queue')
    }
}

