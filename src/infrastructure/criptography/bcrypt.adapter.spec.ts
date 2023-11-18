import { BcryptAdapter } from "./bcrypt.adapter"
import * as bcrypt from "bcrypt"
describe("BcryptAdapter", () => {
  it("should call bcrypt with correct values", async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, "hash")
    await sut.encrypt("any_value")
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
  })
})
