import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {

  public async register({ request, response, auth }: HttpContextContract) {
    //get request body
    const { email, password } = request.body()

    //cek unique email
    const oldUser = await User.query()
      .where({ email: email }).first()
    if (oldUser) {
      return response.status(422).json({
        message: "Email sudah terdaftar"
      })
    }

    //hashing password
    const hashedPassword = await Hash.make(password)

    //create user
    const user = await User.create({
      email: email,
      password: hashedPassword
    })

    //generate token
    const token = await auth.use('api').generate(user)

    //response
    return response.json({
      data: {
        user: user,
        token: token
      }
    })

  }

  public async login({ request, response, auth }: HttpContextContract) {
    //get request body
    const { email, password } = request.body()

    //get user by email
    const user = await User.query()
      .where({ email: email }).first()
    if (!user) {
      return response.status(422).json({
        message: "Email sudah terdaftar"
      })
    }

    //verivied password
    if (!(await Hash.verify(user.password, password))) {
      return response.status(422).json({
        message: "Email password salah"
      })
    }

    //generate token
    const token = await auth.use('api').generate(user)

    //response
    return response.json({
      data: {
        user: user,
        token: token
      }
    })

  }

}
