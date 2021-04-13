import { HttpResponse } from "../helpers/http-response";

class LoginRouter {
  route(httpRequest:any) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

export default LoginRouter 