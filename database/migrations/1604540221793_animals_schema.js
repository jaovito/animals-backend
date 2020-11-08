'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnimalsSchema extends Schema {
  up () {
    this.create('animals', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('reason_adoption').notNullable()
      table.string('breed').notNullable()
      table.string('citie').notNullable()
      table.string('contact').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('animals')
  }
}

module.exports = AnimalsSchema
