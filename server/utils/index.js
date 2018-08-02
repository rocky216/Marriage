var fs = require("fs")
var readline = require("readline")
var path = require("path")

var logintextPath = path.join(__dirname, "login.txt")


export function verfiyMobile(str){
  var reg = /^1[345678]\d{9}$/
  return reg.test(str)
}

export function writeInto(arr){
  var data = fs.writeFileSync(logintextPath, '')
  _.each(arr, (item, index)=>{
    var enter = index==0?'':'\r\n'
    var str=''
    for(var attr in item){
      str = attr+':'+item[attr]
    }
    fs.appendFile(logintextPath, enter+str, function (err) {  //+JSON.stringify(item)
       if (err) throw err;
    });
  })
}

export function readFileToArr(callback){
    var fRead = fs.createReadStream(logintextPath);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
       // console.log(arr);
       var myArr = []
       _.each(arr,(item, attr)=>{
         var newArr = item.split(":")
         var newObj = {[newArr[0]]:newArr[1]}
         myArr.push(newObj)
       })

        callback(myArr);
    });
}

export function isPush(id, token){
  return new Promise((resolve, reject)=>{
    readFileToArr((arr)=>{
      if (arr.length==0) {

      }
      _.each(arr, (item, index)=>{
        if (!item.hasOwnProperty(id)) {
          resolve(true)
          return
        }else {
          if (item[id] == token) {
            resolve(true)
            return
          }else {
            reject(false)
            return
          }
        }
      })
    })
  })
}
