import { createCipheriv, randomBytes, scrypt, createDecipheriv } from "crypto";
import { promisify } from "util";
const AES = "aes-256-ctr";
const iv = randomBytes(16);
const password = "Password used to gen key";
const key = (await promisify(scrypt)(password, "salt", 32));
console.log("key", key);
const cipher = createCipheriv(AES, key, iv);
const textToEncrypt = "Something";
const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);
console.log("encryptedText", encryptedText);
const decipher = createDecipheriv(AES, key, iv);
const decryptedText = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
console.log("decryptedText.toString()", decryptedText.toString());
//# sourceMappingURL=encryption.js.map