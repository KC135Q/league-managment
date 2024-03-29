const jwt = require('jsonwebtoken');
const { Member } = require("../db/models");
const { invalidInput } = require("./strings");

const generateToken = (member, expiresIn = process.env.TOKEN_EXPIRES_IN) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(member, secretKey, { expiresIn });
  return token;
};

const refreshToken = (member, expiresIn = process.env.TOKEN_EXPIRES_IN) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(member, secretKey, { expiresIn });
  return token;
};

const verifyToken = async (token) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    const memberExists = await Member.findByPk(decoded.memberId);
    if (!memberExists) {
      throw new Error(invalidInput);
    }
    return decoded;
  } catch (error) {
    return error;
  }

    };

module.exports = {
    generateToken,
    refreshToken,
    verifyToken
}