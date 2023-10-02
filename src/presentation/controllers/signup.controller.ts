import { InvalidParamError } from "../errors/invalid-param.error"
import { MissingParamError } from "../errors/missing-param.error"
import { badRequest } from "../helpers/http.helper"
import { Controller } from "../protocols/controller.protocol"
import { EmailValidator } from "../protocols/email-validator.protocol"
import { HttpRequest, HttpResponse } from "../protocols/http.protocol"

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    const requiredFields = ["name", "email", "password", "passwordConfirmation"]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return badRequest(new InvalidParamError("email"))
    }
  }
}
