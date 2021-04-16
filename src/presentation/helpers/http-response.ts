import { ServerError } from '../errors/server-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

class HttpResponse {
  // @ts-ignore
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  static ok (data: string) {
    return {
      statusCode: 200,
      body: data
    }
  }
}

export { HttpResponse }
