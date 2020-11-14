
'use strict'
const {parseISO, isBefore, subHours} = require('date-fns')
const Mail = use('Mail')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token')
const User = use('App/Models/User')

class ResetPasswordController {
    async forgot({request}) {
        const email = request.input('email')

        const user = await User.findByOrFail('email', email)
        
        const min = Math.ceil(1000);
        const max = Math.floor(9999);
        const token = Math.floor(Math.random() * (max - min)) + min;

        await user.tokens().create({
            token,
            type: 'forgotpassword'
        })

        await Mail.send('emails.token', {token}, (message) => {
            message
              .to(email)
              .from('junior.vitorio.dias@hotmail.com')
              .subject('Recuperação de senha')
          })

    }

    async store({request, response}) {
        const {token, password} = request.only([
            'token',
            'password'
        ])

        const userToken = await Token.findByOrFail('token', token)

        if(isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
            return response.status(400).json({error: 'Invalid date range, please try again.'})
        }

        const user = await userToken.user().fetch()

        user.password = password

        await user.save()

        userToken.delete()
    }
}

module.exports = ResetPasswordController