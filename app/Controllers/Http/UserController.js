'use strict'
const User = use('App/Models/User')
const City = use('App/Models/City')

class UserController {
    async register({ request }) {
        const data = request.only([
            'name',
            'second_name',
            'whatsapp',
            'email',
            'password',
        ])
        
        const user = await User.create(data)
        
        return user
    }

    async authenticate({ request, auth }) {
        const {email, password} = request.all()

        const token = await auth.attempt(email, password)

        return token
    }

    async citiesCreate({auth}) {
      const user = auth.user

      const cities = request.only([
        'city'
      ])

      const city = await City.create({user_id: user.id, ...cities})

      return city
    }
}

module.exports = UserController
