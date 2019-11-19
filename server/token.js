const jwt = require('jsonwebtoken');

const key = 'vue-admin-template'; // 密钥

const createToken = function(loginName) {
  return jwt.sign({
    loginName
  }, key, {
    expiresIn: 60
  })
}

const verifyToken = (_token) => {
  let verify = jwt.verify(_token, key, (error, decoded) => {
      if(error) {
          return false;
      }
      return true;
  });
  return verify;
};

module.exports = {
  createToken,
  verifyToken
}