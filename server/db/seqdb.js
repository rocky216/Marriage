const Sequelize = require("sequelize")
const {DB_DATABASE, DB_USER, DB_PASS, DB_HOST} = process.env
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

// 或者你可以简单地使用 uri 连接
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库链接成功！');
  })
  .catch(err => {
    console.error('数据库链接失败！', err);
  });



export default sequelize
