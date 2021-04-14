import { HttpResponse } from '../helpers/http-response'

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  // @ts-ignore
  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
      }
      const accessToken = this.authUseCase.auth(email, password)
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
