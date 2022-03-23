import * as bcrypt from "bcrypt";
const cl = console.log;
const saltOrRounds = 10;
const password1 = "random_password";
const hash1 = await bcrypt.hash(password1, saltOrRounds);
cl("hash1", hash1, "\n");
const isMatch1 = await bcrypt.compare(password1, hash1);
cl("isMatch1", isMatch1);
const salt2 = await bcrypt.genSalt(saltOrRounds);
const password2 = "3f32j32hfew";
const hash2 = await bcrypt.hash(password2, salt2);
cl("hash2", hash2, "\n");
const isMatch2 = await bcrypt.compare(password2, hash2);
cl("isMatch2 ", isMatch2);
//# sourceMappingURL=hashing_bcrypt.js.map