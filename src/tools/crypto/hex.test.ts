import { Buffer } from "node:buffer"
import { describe, it, expect } from "vitest"

import { hex } from "./hex"

describe("hex", () => {
  describe("encode", () => {
    it("should encode a Uint8Array to hexadecimal", () => {
      const input = new Uint8Array([72, 101, 108, 108, 111])
      expect(hex.encode(input)).toBe(Buffer.from(input).toString("hex"))
    })
  })
})
