import { SignUpController } from "./signup"

describe("SignUpController", () => {
  it("should return 400 if no name is provided", async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: "a@b.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
