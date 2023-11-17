import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
} from "./db-add-account.protocol"

export class DBAddAccountService implements AddAccount {
  private readonly encrypter: Encrypter
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return Promise.resolve({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email@mail.com",
      password: "valid_password",
    })
  }
}
