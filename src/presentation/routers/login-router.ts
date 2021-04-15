import { HttpResponse } from '../helpers/http-response'
import { MissingParamError } from '../helpers/missing-param-error'

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  // @ts-ignore
  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      // console.log('Server error: ', error)
      return HttpResponse.serverError()
    }
  }
}
export { LoginRouter }
