import { MissingParamError } from "../errors/missing-param.error"
import { badRequest } from "../helpers/http.helper"
import { Controller } from "../protocols/controller.protocol"
import { HttpRequest, HttpResponse } from "../protocols/http.protocol"

export class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    const requiredFields = ["name", "email", "password", "passwordConfirmation"]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
