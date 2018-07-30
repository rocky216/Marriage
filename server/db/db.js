var mysql = require('mysql');
var dbconfig = require("./database")
var pool = mysql.createPool(dbconfig.connection);



export function Operation(sql){
  return new Promise((resolve, reject)=>{

    pool.getConnection((err,connection)=>{
      if (err) {
        console.log('与MySQL数据库建立连接失败！');
        reject(err)
        return
      }else {
        connection.query(sql, (err,result)=>{
          if(err){
              reject(err)
              console.log('插入数据失败');
              connection.release(); // 释放连接池的连接，因为连接池默认最大连接数是10，如果点击数超过10 则不会与客户端连接，客户端的请求也会因为长时间无反应报错，下面会粘出报错的图
          }else {
            resolve(result)
            connection.release();
          }
        })
      }
    })
  })

}

export default pool
