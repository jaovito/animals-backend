'use strict'

const User = use('App/Models/User')
const Animal = use('App/Models/Animal')

class UserDatumController {
    async index({ auth }) {
        const userData = await User.findOrFail(auth.user.id)

        const {id, name, second_name, cpf, whatsapp, city} = userData
        
        return {id, name, second_name, cpf, whatsapp, city}
    }

    async update({ auth, request }) {
        const user = await User.findOrFail(auth.user.id)

        const data = request.only([
            'name',
            'second_name',
            'whatsapp',
            'email',
            'city',
        ])

        user.merge(data)

        await user.save()

        return user
    }

    async animals({auth}) {
        const animal = await Animal.query().where('user_id', auth.user.id).with('images').fetch()

        return animal
    }
}

module.exports = UserDatumController
