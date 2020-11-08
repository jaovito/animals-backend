'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {
    user () {
        this.belongsTo('App/Models/User')
    }
}

module.exports = City
