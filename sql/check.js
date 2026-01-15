import bcrypt from "bcryptjs";

const has = await bcrypt.hash("", 10)
const hash = await bcrypt.hash("", 10)

console.log(has)
console.log(hash)
console.log(await bcrypt.compare("", hash))