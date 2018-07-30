import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router"
import {Table, Button, Icon, Row, Col} from "antd"
import Jcard from "components/Jcard"
import {getUserList} from "actions/userAction"
import columns from "./table-columns"
import {addIndex} from "utils"

class User extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.actions.getUserList()
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
          columns={columns}
          dataSource={addIndex(userList)}
        />
      </Jcard>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getUserList}, dispatch)
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
