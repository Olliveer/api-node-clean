/* eslint-disable no-undef */

class AuthUseCase {
  async auth (email: string) {
    if (!email) {
      throw new Error()
    }
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('')

    expect(promise).rejects.toThrow()
  })
})
