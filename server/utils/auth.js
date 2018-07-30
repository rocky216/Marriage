import jwt from "jsonwebtoken"
import qs from "qs"

export const dataIntial = {
  status: -1,
  msg: "token参数错误！",
  res: null
}

export function auth(req, res, next){
  var token = req.session.token

  if (!verifyToken(req.body.token)) {
    res.json(dataIntial)
  }else {
    next()
  }
}


export function setToken(userInfo){
  return jwt.sign(
    userInfo,
    process.env.CERT_KEY,
    {expiresIn: '1h'}
  )
}

export function verifyToken(token){
  return new Promise((resolve, reject)=>{
    jwt.verify(token, process.env.CERT_KEY, (err, decoded)=>{
      err?reject(err):resolve(decoded)
    })
  })

}
