import { AccountModel } from "../models/account.interface.model"

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>
}
