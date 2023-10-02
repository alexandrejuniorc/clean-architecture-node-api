import { MissingParamError } from "../errors/missing-param.error"
import { SignUpController } from "./signup.controller"

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe("SignUpController", () => {
  it("should return 400 if no name is provided", async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: "a@b.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError("name"))
  })

  it("should return 400 if no email is provided", async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError("email"))
  })

  it("should return 400 if no password is provided", async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: "a@b.com",
        name: "any_name",
        passwordConfirmation: "any_password",
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError("password"))
  })

  it("should return 400 if no password confirmation is provided", async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: "a@b.com",
        name: "any_name",
        password: "any_password",
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(
      new MissingParamError("passwordConfirmation")
    )
  })
})
