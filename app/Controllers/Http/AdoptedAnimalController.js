'use strict'
const Animal = use('App/Models/Animal')

class AdoptedAnimalController {
    async index({ auth }) {
        const animal = await Animal.query()
            .where('citie', auth.user.city)
            .where('adopted', true)
            .with('images')
            .fetch()

        return animal
    }
}

module.exports = AdoptedAnimalController
