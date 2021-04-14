import { HttpResponse } from '../helpers/http-response'

class LoginRouter {
  authUseCase: any
  constructor (authUseCase: any) {
    this.authUseCase = authUseCase
  }

  // @ts-ignore
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
    this.authUseCase.auth(email, password)
    return HttpResponse.unauthorizedError()
  }
}
export { LoginRouter }
