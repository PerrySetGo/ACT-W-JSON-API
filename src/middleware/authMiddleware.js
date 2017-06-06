import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60 * 60 * 24 * 30; //30 days
const SECRET = "!NastyNi88les" //change me

let authenticate = expressJwt({secret: SECRET});

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {}; //why empty object
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME
  });
  next();
} //next means middleware because it passes it on

let respond = (req, res) => {
  res.status(200).json({
    user:req.user.username,
    token:req.token
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
