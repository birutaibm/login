import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import APIToken from 'App/Models/APIToken'

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const uid = request.input('uid')
    const password = request.input('password')

    const token = await auth.use('api').attempt(uid, password)
    await APIToken.create({
      expiresAt: token.expiresAt,
      name: token.name,
      token: token.token,
      type: token.type,
      userId: token.user.id,
    });
    return {
      token: token.token,
      user: {
        id: token.user.id.toString(),
        name: token.user.username,
        email: token.user.email,
      }
    }
  }
}
