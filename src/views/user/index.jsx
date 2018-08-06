import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router"
import {Table, Button, Icon, Row, Col, Popconfirm} from "antd"
import Jcard from "components/Jcard"
import {getUserList, deleteUser} from "actions/userAction"
import columns from "./table-columns"
import {addIndex} from "utils"

class User extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.actions.getUserList()
  }
  deleteUser(item){
    this.props.actions.deleteUser({id: item.id})
    this.props.actions.getUserList()
  }
  getCol(){
    var _this = this
    return columns.concat([{
      title: "操作",
      render(text, item){
        return (
          <div>
            <Link to={`/userdetail/${item.id}`}>详情</Link>
            <Link to={`/editUser/${item.id}`} className="mgl10" >编辑</Link>
            <Popconfirm  placement="topRight" title="确认删除？" onConfirm={_this.deleteUser.bind(_this, item)} >
              <a className="mgl10" href="javascript:;">删除</a>
            </Popconfirm>
          </div>
        )
      }
    }])
  }
  render(){
    const {spinning, userList} = this.props
    return (
      <Jcard spinning={spinning} >
        <Row style={{marginBottom: "10px"}}>
          <Col>
            <Link to="/addUser"><Button type="primary"><Icon type="plus" />添加用户</Button></Link>
          </Col>
        </Row>

        <Table
          columns={this.getCol()}
          dataSource={addIndex(userList)}
        />
      </Jcard>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getUserList, deleteUser}, dispatch)
  }
}

function mapStateToProps(state){
  console.log(state);
  return {
    spinning: state.users.spending,
    userList: state.users.userList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
