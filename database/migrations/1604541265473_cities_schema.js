'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitiesSchema extends Schema {
  up () {
    this.create('cities', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('city')
      table.timestamps()
    })
  }

  down () {
    this.drop('cities')
  }
}

module.exports = CitiesSchema
