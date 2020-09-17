import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const uid = request.input('uid')
    const password = request.input('password')

    const token = await auth.use('api').attempt(uid, password, {
      expiresIn: '1 minute',
    })
    return {
      token: token.token,
      user: {
        id: token.user.id.toString(),
        name: token.user.username,
        email: token.user.email,
      }
    }
  }

  public async logout ({ auth }: HttpContextContract) {
    await auth.use('api').logout();
  }
}
