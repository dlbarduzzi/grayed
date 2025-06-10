import { describe, it, expect } from "vitest"
import { hashPassword, verifyPassword } from "./password"

describe("hash and verify password", () => {
  it("should hash password", async () => {
    const password = "testPassword123!"
    const hash = await hashPassword(password)
    expect(hash).toBeTruthy()
    expect(hash.split(":").length).toBe(2)
  })

  it("should verify password", async () => {
    const password = "testPassword123!"
    const hash = await hashPassword(password)
    const isValid = await verifyPassword({ hash, password })
    expect(isValid).toBe(true)
  })

  it("should fail on a wrong password", async () => {
    const password = "testPassword123!"
    const wrongPassword = "testWrongPassword456!"
    const hash = await hashPassword(password)
    const isValid = await verifyPassword({ hash, password: wrongPassword })
    expect(isValid).toBe(false)
  })

  it("should generate different hashes for the same password", async () => {
    const password = "testPassword123!"
    const hash1 = await hashPassword(password)
    const hash2 = await hashPassword(password)
    expect(hash1).not.toBe(hash2)
  })

  it("should handle long password", async () => {
    const password = "0".repeat(1000)
    const hash = await hashPassword(password)
    const isValid = await verifyPassword({ hash, password })
    expect(isValid).toBe(true)
  })

  it("should fail password with case-sensitive", async () => {
    const password = "testPassword123!"
    const hash = await hashPassword(password)
    const isValidLower = await verifyPassword({
      hash,
      password: password.toLowerCase(),
    })
    const isValidUpper = await verifyPassword({
      hash,
      password: password.toUpperCase(),
    })
    expect(isValidLower).toBe(false)
    expect(isValidUpper).toBe(false)
  })

  it("should handle password with Unicode characters", async () => {
    const password = "пароль123!"
    const hash = await hashPassword(password)
    const isValid = await verifyPassword({ hash, password })
    expect(isValid).toBe(true)
  })
})
