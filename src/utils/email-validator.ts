import validator from 'validator'

class EmailValidator {
  isValid (email: string) {
    return validator.isEmail(email)
  }
}
export { EmailValidator }
