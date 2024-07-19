const JWT = require('jsonwebtoken');
const secretKey = 'adityadhonde@123';
module.exports = function verifyToken(req, resp, next) {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      JWT.verify(token, secretKey, (err) => {
        if (err) {
          resp.status(400).send({ msg: "Plz send valid token" });
        } else {
          next();
        }
      });
    } else {
      resp.status(400).send({ res: "Please send tokens with header" });
    }
  }