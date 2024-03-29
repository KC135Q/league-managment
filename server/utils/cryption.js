const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.DB_ENCRYPTION_KEY;
const ivString = process.env.IV_STRING;
const iv = Buffer.from(ivString.split(','), 'hex');
 
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

function decrypt(encryptedData) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return decryptedData;
  } catch (error) {
    console.error(error);
    return null;
  }

}

module.exports = {
  encrypt,
  decrypt,
};
