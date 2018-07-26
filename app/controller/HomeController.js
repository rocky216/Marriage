import {Operation} from "../../db/db"
import Password from "node-php-password"

var dataIntial = {
  status: 1,
  msg: "请求成功！",
  res: null
}

class HomeController {
  constructor() {

  }

  async Login(req, res){
    // var pwd = Password.hash("xb921214", "PASSWORD_BCRYPT", {cost: 12})
    let body = req.body
    var data = await Operation(`select * from sr_member where mobile=${body.mobile}`)
    dataIntial.res = data
    res.json(dataIntial)

  }

}

module.exports = new HomeController()
