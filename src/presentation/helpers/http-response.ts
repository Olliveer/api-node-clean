import { MissingParamError } from "./missing-param-error"


class HttpResponse {
  //@ts-ignore
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }
  static serverError() {
    return {
      statusCode: 500
    }
  }
}

export { HttpResponse }