import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index () {
    return User.all()
  }

  public async create ({ request, response }: HttpContextContract) {
    const data = request.all()
    const conflictingUser = await User.findBy('email', data.email)
    if (conflictingUser) {
      return response.status(400).json({
        status: 'error',
        message: 'e-mail is already in use',
      })
    }
    if (!data.role) {
      data.role = 'USER'
    }
    const user = await User.create(data)
    return user
  }
}
