import { Encrypter } from "@/data/protocols/encrypter.interface.protocol"
import { DBAddAccountService } from "./db-add-account.service"

interface SutTypes {
  sut: DBAddAccountService
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return Promise.resolve("hashed_password")
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DBAddAccountService(encrypterStub)
  return {
    sut,
    encrypterStub,
  }
}

describe("DbAddAccount Service", () => {
  it("should call Encrypter with correct password", async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt")
    const accountData = {
      name: "valid_name",
      email: "valid_email@mail.com",
      password: "valid_password",
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith("valid_password")
  })
  it("should throw if Encrypter throws", async () => {
    const { encrypterStub, sut } = makeSut()
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(Promise.reject(new Error()))
    const accountData = {
      name: "valid_name",
      email: "valid_email@mail.com",
      password: "valid_password",
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
