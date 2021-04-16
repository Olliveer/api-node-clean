class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'MissingParamError'
  }
}
export { UnauthorizedError }
