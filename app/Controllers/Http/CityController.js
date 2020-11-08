'use strict'
const City = use('App/Models/City')

class CityController {
    async index() {
        const cities = await City.all()

        return cities
    }

    async store({ request, auth }) {
        const data = request.only(['city'])

        const user = auth.user

        const city = await City.create({user_id: user.id, ...data})

        return city
    }
}

module.exports = CityController
