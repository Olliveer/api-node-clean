import { MissingParamError } from '../helpers/missing-param-error'
import { UnauthorizedError } from '../helpers/unauthorized-error'
import { LoginRouter } from './login-router'

const makeSut = () => {
  class AuthUseCaseSpy {
    email!: string
    password!: string
    auth (email: string, password: string) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut, authUseCaseSpy
  }
}

/* eslint-disable no-undef */
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse.statusCode).toBe(400)
    // @ts-ignore
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse.statusCode).toBe(400)
    // @ts-ignore
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()

    const httpResponse = sut.route({})
    // @ts-ignore
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    // @ts-ignore
    const httpRequest = {}

    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    // @ts-ignore
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid credentials are provided', () => {
    const { sut } = makeSut()
    // @ts-ignore
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse?.statusCode).toBe(401)
    // @ts-ignore
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })

  test('Should return 500 if no AuthUseCase is provided', () => {
    const sut = new LoginRouter()
    // @ts-ignore
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse?.statusCode).toBe(500)
  })

  test('Should return 500 if no AuthUseCase has no auth method', () => {
    const sut = new LoginRouter({})
    // @ts-ignore
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse?.statusCode).toBe(500)
  })
})
