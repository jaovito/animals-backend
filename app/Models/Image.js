'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env')
const Model = use('Model')


class Image extends Model {
  
  animal() {
    this.belongsTo('App/Models/Animal')
  }
}

module.exports = Image
