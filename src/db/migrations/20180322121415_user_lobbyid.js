
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table
        .integer('lobbyId')
        .unsigned()
        .references('id').inTable('lobby')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table
        .dropColumn('lobbyId')
    });
};
