import type { ScryptOpts } from "@noble/hashes/scrypt"

import { scryptAsync } from "@noble/hashes/scrypt"
import { getRandomValues } from "uncrypto"

import { hex } from "./hex"
import { constantTimeEqual } from "./buffer"
import { hexToBytes } from "@noble/hashes/utils"

const opts: ScryptOpts = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
}

async function generateBuffer(password: string, salt: string) {
  return await scryptAsync(password.normalize("NFKC"), salt, {
    N: opts.N,
    p: opts.p,
    r: opts.r,
    dkLen: opts.dkLen,
    maxmem: 128 * opts.N * opts.r * 2,
  })
}

export async function hashPassword(password: string) {
  const salt = hex.encode(getRandomValues(new Uint8Array(16)))
  const buffer = await generateBuffer(password, salt)
  return `${salt}:${hex.encode(buffer)}`
}

export async function verifyPassword({
  hash,
  password,
}: { hash: string, password: string }) {
  const [salt, text] = hash.split(":")
  if (salt == null || text == null) return false
  const buffer = await generateBuffer(password, salt)
  return constantTimeEqual(buffer, hexToBytes(text))
}
