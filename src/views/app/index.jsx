import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Layout, Menu} from "antd"
import SiderBar from "components/SiderBar"
import {getAdmin} from "actions/homeAction"
import {Icon, Button} from "antd"

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.actions.getAdmin()
  }
  render(){
    const {admin} = this.props

    return (
      <div>
        <Layout>
          <SiderBar/>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className="mgr10" style={{float: "right"}}>
                <span className="mgr10">{admin?admin.username: ''}</span>
                <Button><Icon type="login" /></Button>
              </div>
            </Header>
            <Content style={{minHeight: "780px"}}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getAdmin},dispatch)
  }
}

function mapStateToProps(state){
  console.log(state)
  return {
    admin: state.home.getAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
