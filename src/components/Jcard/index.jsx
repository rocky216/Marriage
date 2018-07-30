import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Spin} from "antd"

class User extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const {spinning} = this.props
    return (
      <div style={{borderRadius:"3px", padding:'10px', background: "#fff", border: "1px solid #f1f1f1", margin:"10px", boxShadow: "0 0 5px #ddd"}}>
        <Spin spinning={spinning?spinning:false} >
          {this.props.children}
        </Spin>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
