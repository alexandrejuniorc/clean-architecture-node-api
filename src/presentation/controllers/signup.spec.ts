import { InvalidParamError } from "../errors/invalid-param.error"
import { MissingParamError } from "../errors/missing-param.error"
import { EmailValidator } from "../protocols/email-validator.protocol"
import { SignUpController } from "./signup.controller"

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub,
  }
}

describe("SignUpController", () => {
  it("should return 400 if no name is provided", async () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  it("should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: "any_name",
        email: "a@b.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new InvalidParamError("email"))
  })

  it("should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid")
    const httpRequest = {
      body: {
        name: "any_name",
        email: "a@b.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith("a@b.com")
  })
})
