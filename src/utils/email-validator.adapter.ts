import { EmailValidator } from "@/presentation/protocols/email-validator.protocol"

export class EmailValidatorAdapter implements EmailValidator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isValid(email: string): boolean {
    return false
  }
}
