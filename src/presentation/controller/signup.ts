export class SignUpController {
  async handle(httpResponse: any): Promise<any> {
    console.log(httpResponse)

    return {
      statusCode: 400,
    }
  }
}
