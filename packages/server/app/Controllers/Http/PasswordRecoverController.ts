import { uuid } from 'uuidv4'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
//import Mail from '@adonisjs/mail/build/providers/MailProvider'
import PasswordRecover from 'App/Models/PasswordRecover'
import User from 'App/Models/User'

export default class PasswordRecoversController {
  public async create ({ request, response }: HttpContextContract) {
    const { uid } = request.all()

    const user = (await User.findBy('email', uid))
      || (await User.findBy('username', uid))
    if (!user) {
      return response.status(400).json({
        status: 'error',
        message: 'e-mail is not yet registered',
      })
    }

    const token = uuid()
    await PasswordRecover.create({
      email: user.email,
      username: user.username,
      token,
    })
    const mail = await Mail.send(message => {
      message.from('foo@bar.com')
      message.to(user.email, user.username)
      message.subject('Password recover')
      message.htmlView(
        'email/password',
        { link: `${process.env.WEB_APP_URL}/reset-password?token=${token}` }
      )
    })
    console.log(mail)
    return response.status(201)
  }

  public async update ({ request }: HttpContextContract) {
    const { token, password } = request.all()
    const registry = await PasswordRecover.findOrFail(token)
    const { email, username, createdAt } = registry
    registry.delete()
    if (createdAt.plus({ hours: 2 }).toJSDate().getTime() < Date.now()) {
      throw new Error('Token expired')
    }
    const user = await User.findBy('email', email)
    if (user) {
      if (user.username === username) {
        user.password = password
        await user.save()
      } else {
        throw new Error('Something strange with token')
      }
    } else {
      await User.create({
        email,
        username,
        password,
      })
    }
  }
}
