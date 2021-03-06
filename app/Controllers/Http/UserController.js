'use strict'
const User = use('App/Models/User')

class UserController {
    async register({ request }) {
        const data = request.only([
            'name',
            'second_name',
            'cpf',
            'whatsapp',
            'email',
            'password',
            'city'
        ])
        
        const user = await User.create(data)

        return user
    }

    async authenticate({ request, auth }) {
        const {email, password} = request.all()

        const token = await auth.attempt(email, password)

        return token
    }

}

module.exports = UserController
