import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Cascader } from "antd"
import {getAreaInfo} from "action/userAction"


class AreaSelect extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){

  }
  render(){
    return (
      <div>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getAreaInfo}, dispatch)
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaSelect)
