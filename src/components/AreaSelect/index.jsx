import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Cascader } from "antd"
import {getAreaInfo} from "actions/userAction"


class AreaSelect extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.actions.getAreaInfo()
  }
  render(){
    const {areaList, changeHandle} = this.props
    return (
      <Cascader options={areaList} onChange={changeHandle} placeholder="请选择地区"/>
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
    areaList: state.users.areaList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaSelect)
