import { BcryptAdapter } from "./bcrypt.adapter"
import * as bcrypt from "bcrypt"

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hash")
  },
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe("BcryptAdapter", () => {
  it("should call bcrypt with correct values", async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, "hash")
    await sut.encrypt("any_value")
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
  })
  it("should return a hash on success", async () => {
    const sut = makeSut()
    const hash = await sut.encrypt("any_value")
    expect(hash).toBe("hash")
  })
  it("should throw if bcrypt throws", async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt("any_value")
    await expect(promise).rejects.toThrow()
  })
})
