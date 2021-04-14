import { MissingParamError } from '../helpers/missing-param-error'
import { LoginRouter } from './login-router'

const makeSut = () => {
  return new LoginRouter()
}

/* eslint-disable no-undef */
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()

    const httpResponse = sut.route({})
    // @ts-ignore
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = makeSut()
    // @ts-ignore
    const httpRequest = {}

    const httpResponse = sut.route(httpRequest)
    // @ts-ignore
    expect(httpResponse.statusCode).toBe(500)
  })

  // test('Should call AuthUseCase with correct params', () => {
  //   const sut = new LoginRouter()
  //   // @ts-ignore
  //   const httpRequest = {}

  //   const httpResponse = sut.route(httpRequest)
  //   // @ts-ignore
  //   expect(httpResponse.statusCode).toBe(500)
  // })
})
