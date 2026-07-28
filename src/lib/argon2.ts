import { hash, verify, type Options } from "@node-rs/argon2";

// each hash operation uses approximately 19 MB of RAM; more ram more secure
// number of passes over memory
// length of the generated hash in bytes e.g. 32 bytes = 256 bits
// number of parallel threads Argon2 can use
const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;

  const result = await verify(hash, password, opts);
  return result;
}
