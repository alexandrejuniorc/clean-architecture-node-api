import { DBAddAccountService } from "./db-add-account.service"

describe("DbAddAccount Service", () => {
  it("should call Encrypter with correct password", async () => {
    class EncrypterStub {
      async encrypt(): Promise<string> {
        return Promise.resolve("hashed_password")
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DBAddAccountService(encrypterStub)
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
