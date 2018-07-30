function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data )
      }, 2000)
    } catch ( err ) {
      reject( err )
    }
  })
}

class TestController {
  constructor() {

  }

  async testSession(req, res, next){
    var body = req.body
    // var data = await getSyncTime()
    req.session.username = body.username
    
    res.json({
      aa: body.username
    })
  }

}

module.exports = new TestController()
