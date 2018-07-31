import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getHome} from "actions/homeAction"
import {Layout, Menu} from "antd"
import SiderBar from "components/SiderBar"

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){

  }
  render(){
    return (
      <div>
        <Layout>
          <SiderBar/>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
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
    actions: bindActionCreators({getHome},dispatch)
  }
}

function mapStateToProps(state){
  console.log(state)
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
