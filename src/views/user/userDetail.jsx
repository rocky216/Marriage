import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Jcard from "components/Jcard"
import {getUserDetail} from "actions/userAction"
import {Link} from "react-router"
import {Card, Row, Col} from "antd"
import areaAll from "../../../server/app/areaData"
import {salary, education} from "../../../server/app/dataBase"
import moment from "moment"

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  componentDidMount(){
    const {id} = this.props.params
    this.props.actions.getUserDetail({id})
  }
  getArea(province, city, area){
    if(!province) return "无"
    var areaData = areaAll.provinces

    return `${areaData[province]["name"]} ${areaData[province]["citys"][city]["name"]} ${areaData[province]["citys"][city]["countys"][area]["name"]}`
  }
  render(){
    const {userDetail, spending, userBase} = this.props
    return (
      <Jcard spinning={spending}>
        <Card title="基本信息"  extra={<Link to="/user">返回</Link>}>
          <Row >
            <Col className="mgb30" span={8}>
              <strong className="mgr10">用户名</strong>
              <span>{userBase?userBase.username:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10" >手机号</strong>
              <span>{userBase?userBase.mobile:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10" >昵称</strong>
              <span>{userBase?userBase.nickname:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10" >生日</strong>
              <span>{userBase?moment(userBase.birthday).format("YYYY-MM-DD"):''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10" >地区</strong>
              <span>{userBase?this.getArea(userBase.province, userBase.city, userBase.area):''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10" >性别</strong>
              <span>{userBase && userBase.sex?"男":'女'}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10" >头像</strong>
              {userBase && userBase.headimg?<img src={userBase.headimg} style={{width: "80px", height:"80px"}} />:""}
            </Col>
          </Row>
        </Card>
        <Card title="详细信息" className="mgt10">
          <Row>
            <Col className="mgb30" span={8}>
              <strong className="mgr10">详细地址</strong>
              <span>{userDetail?userDetail.address:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10">个性签名</strong>
              <span>{userDetail?userDetail.description:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10">教育程度</strong>
              <span>{userDetail?education.filter(item=>item.value==userDetail.education)[0]["label"]:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10">积分</strong>
              <span>{userDetail?userDetail.integral:''}</span>
            </Col>
            <Col className="mgb30" span={8}>
              <strong className="mgr10">薪资</strong>
              <span>{userDetail?salary.filter(item=>item.value==userDetail.salary)[0]["label"]:''}</span>
            </Col>
          </Row>
        </Card>
      </Jcard>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getUserDetail}, dispatch)
  }
}

function mapStateToProps(state){
  return {
    userBase: state.users.userBase,
    userDetail: state.users.userDetail,
    spending: state.users.spending
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
