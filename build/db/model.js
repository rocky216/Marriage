'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemberIntegralRecode = exports.MemberIntegral = exports.Banner = exports.MemberInfo = exports.Member = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _sequelize$define, _sequelize$define2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = require('sequelize');

var _process$env = process.env,
    DB_DATABASE = _process$env.DB_DATABASE,
    DB_USER = _process$env.DB_USER,
    DB_PASS = _process$env.DB_PASS,
    DB_HOST = _process$env.DB_HOST,
    DB_PORT = _process$env.DB_PORT;

var sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var Member = exports.Member = sequelize.define('sr_member', { //用户表
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
    is_del: Sequelize.BOOLEAN,
    integral: Sequelize.BIGINT(11),
    is_marriage: Sequelize.BOOLEAN,
    see_ids: Sequelize.STRING
}, { freezeTableName: true, timestamps: false });

var MemberInfo = exports.MemberInfo = sequelize.define('sr_member_info', { //用户信息表
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
    education: Sequelize.BIGINT(11),
    salary: Sequelize.BIGINT(11)
}, {
    timestamps: false,
    freezeTableName: true
});

var Banner = exports.Banner = sequelize.define("sr_banner", {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    adspace_id: Sequelize.BIGINT(11),
    type: Sequelize.STRING,
    site_id: Sequelize.BIGINT(11),
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    save_path: Sequelize.STRING,
    url: Sequelize.STRING,
    member_id: Sequelize.BIGINT(11),
    sort: Sequelize.BIGINT(11),
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
    add_time: Sequelize.DATE,
    is_hid: Sequelize.BOOLEAN,
    is_del: Sequelize.BOOLEAN,
    is_marriage: Sequelize.BOOLEAN
}, { freezeTableName: true, timestamps: false });

var MemberIntegral = exports.MemberIntegral = sequelize.define("sr_member_integral", (_sequelize$define = {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    member_id: Sequelize.BIGINT(11),
    integral: Sequelize.BIGINT(11),
    add_time: Sequelize.DATE
}, (0, _defineProperty3.default)(_sequelize$define, 'add_time', Sequelize.DATE), (0, _defineProperty3.default)(_sequelize$define, 'is_hid', Sequelize.BOOLEAN), (0, _defineProperty3.default)(_sequelize$define, 'is_del', Sequelize.BOOLEAN), _sequelize$define), { freezeTableName: true, timestamps: false });

var MemberIntegralRecode = exports.MemberIntegralRecode = sequelize.define("sr_member_integral_record", (_sequelize$define2 = {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    member_id: Sequelize.BIGINT(11),
    integral: Sequelize.BIGINT(11),
    type: Sequelize.BOOLEAN,
    status: Sequelize.BIGINT(11),
    add_time: Sequelize.DATE
}, (0, _defineProperty3.default)(_sequelize$define2, 'add_time', Sequelize.DATE), (0, _defineProperty3.default)(_sequelize$define2, 'is_hid', Sequelize.BOOLEAN), (0, _defineProperty3.default)(_sequelize$define2, 'is_del', Sequelize.BOOLEAN), _sequelize$define2), { freezeTableName: true, timestamps: false });

//var user = User.sync({ force: false }); 创建表
// async function test(){
//   let data = await Member.findAll()
//   console.log(data);
// }
// test()