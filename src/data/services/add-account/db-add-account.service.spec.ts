import { Encrypter } from "@/data/protocols/encrypter.interface.protocol"
import { DBAddAccountService } from "./db-add-account.service"

interface SutTypes {
  sut: DBAddAccountService
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(): Promise<string> {
      return Promise.resolve("hashed_password")
    }
  }
  const encrypterStub = new EncrypterStub()
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
})
