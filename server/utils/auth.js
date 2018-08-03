import jwt from "jsonwebtoken"
import Password from "node-php-password"
import qs from "qs"
import {isPush} from "./index"



export const dataIntial = {
  status: -1,
  msg: "token参数错误！",
  res: null
}

export function createPassword(pwd){  //生成hash密码
  return Password.hash(pwd, "PASSWORD_BCRYPT", {cost: 12})
}

export function verifyPassword(pwd, hash){ //判断hash密码
  return Password.verify(pwd, hash)
}

export async function auth(req, res, next){  //token 是否合格

  const dataIntial = {
    status: -1,
    msg: "token参数错误！",
    res: null
  }
  const {token} = req.body

  try {
    var isVerify = await verifyToken(token)
    var id = isVerify.id
    try {
      var ispush = await isPush(id, token)
      next()
    } catch (e) {
      dataIntial.msg = "你的账号在别处登录！"
      dataIntial.status = -1
      res.json(dataIntial)
    }
  } catch (e) {
    res.json(dataIntial)
  }
}


export function setToken(userInfo){
  return jwt.sign(
    userInfo,
    process.env.CERT_KEY,
    {expiresIn: '2h'}
  )
}

export function verifyToken(token){
  token = token?token:""
  return new Promise((resolve, reject)=>{
    jwt.verify(token, process.env.CERT_KEY, (err, decoded)=>{
      err?reject(err):resolve(decoded)
    })
  })

}
