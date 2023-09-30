import { MissingParamError } from "../errors/missing-param.error"
import { HttpRequest, HttpResponse } from "../protocols/http.protocol"

export class SignUpController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name"),
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError("email"),
      }
    }
  }
}
