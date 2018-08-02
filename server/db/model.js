const Sequelize = require('sequelize');

const {DB_DATABASE, DB_USER, DB_PASS, DB_HOST, DB_PORT} = process.env
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

export let Member = sequelize.define('sr_member',{  //用户表
  id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true
  },
  type: Sequelize.BOOLEAN,
  member_type: Sequelize.BOOLEAN,
  openid: Sequelize.STRING,
  email: Sequelize.STRING,
  mobile: Sequelize.UUID,
  nickname: Sequelize.STRING,
  username: Sequelize.STRING,
  sex: Sequelize.BOOLEAN,
  age: Sequelize.BIGINT(3),
  birthday: Sequelize.DATE,
  idcard: Sequelize.UUID,
  headimg: Sequelize.TEXT,
  signature: Sequelize.STRING,
  password: Sequelize.UUID,
  province: Sequelize.BIGINT(11),
  city: Sequelize.BIGINT(11),
  area: Sequelize.BIGINT(11),
  login_ip: Sequelize.UUID,
  login_time: Sequelize.DATE,
  register_ip: Sequelize.UUID,
  register_time: Sequelize.DATE,
  is_hid: Sequelize.BOOLEAN,
  is_del: Sequelize.BOOLEAN
},{freezeTableName: true,timestamps: false})

export let MemberInfo = sequelize.define('sr_member_info', {  //用户信息表
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    member_id: Sequelize.BIGINT(11),
    description: Sequelize.STRING,
    address: Sequelize.STRING,
    integral: Sequelize.BIGINT(11),
    imgs: Sequelize.TEXT,
    education: Sequelize.STRING,
    salary:  Sequelize.BIGINT(11)
}, {
    timestamps: false,
    freezeTableName: true
});

//var user = User.sync({ force: false }); 创建表
// async function test(){
//   let data = await Member.findAll()
//   console.log(data);
// }
// test()
