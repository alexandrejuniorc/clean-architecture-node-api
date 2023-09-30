export class SignUpController {
  async handle(httpResponse: any): Promise<any> {
    console.log(httpResponse)

    return {
      statusCode: 400,
      body: new Error("Missing param: name"),
    }
  }
}
