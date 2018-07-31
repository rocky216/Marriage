import jwt from "jsonwebtoken"
import Password from "node-php-password"
import qs from "qs"

export const dataIntial = {
  status: -1,
  msg: "token参数错误！",
  res: null
}

export function createPassword(pwd){  //生成hash密码
  return Password.hash(pwd, "PASSWORD_BCRYPT", {cost: 12})
}

export function verifyPassword(pwd, hash){ //判断hash密码
  return Password.verify("password123", hash)
}

export function auth(req, res, next){  //token 是否合格
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
