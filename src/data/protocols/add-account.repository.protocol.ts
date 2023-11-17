import {
  AccountModel,
  AddAccountModel,
} from "../services/add-account/db-add-account.protocols"

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
