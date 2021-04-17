
import { InvalidParamError } from '../../utils/errors/invalid-param-error'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { HttpResponse } from '../helpers/http-response'

class LoginRouter {
  authUseCase: any
  emailValidator: any
  constructor (authUseCase: any, emailValidator: any) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  // @ts-ignore
  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }
      // @ts-ignore
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      // console.log('Server error: ', error)
      return HttpResponse.serverError()
    }
  }
}
export { LoginRouter }
