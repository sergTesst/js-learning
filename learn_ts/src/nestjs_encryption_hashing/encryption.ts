import { createCipheriv, randomBytes, scrypt, createDecipheriv } from "crypto";
import { promisify } from "util";

const AES = "aes-256-ctr";

const iv = randomBytes(16);
const password = "Password used to gen key";

// the key length is dependent on the algo
// in this case for aes256, it is 32 bytes.

const key = (await promisify(scrypt)(password, "salt", 32)) as Buffer;
console.log("key", key);
const cipher = createCipheriv(AES, key, iv);
// console.log("cipher", cipher);

const textToEncrypt = "Something";
const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);

console.log("encryptedText", encryptedText);

const decipher = createDecipheriv(AES, key, iv);
// console.log("decipher ", decipher);
const decryptedText = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
console.log("decryptedText.toString()", decryptedText.toString());
