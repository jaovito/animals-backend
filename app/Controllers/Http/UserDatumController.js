'use strict'

const User = use('App/Models/User')

class UserDatumController {
    async index({ auth }) {
        const userData = await User.findOrFail(auth.user.id)

        const {id, name, second_name, whatsapp, city} = userData
        
        return {id, name, second_name, whatsapp, city}
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
}

module.exports = UserDatumController
