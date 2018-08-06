import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Cascader } from "antd"
import {getAreaInfo} from "actions/userAction"


class AreaSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      defaultArea: this.props.defaultArea
    }
  }
  componentDidMount(){
    this.props.actions.getAreaInfo()
  }
  render(){
    const {areaList, changeHandle, defaultArea} = this.props

    return (
      <div>
        {defaultArea?
          <Cascader value={defaultArea} options={areaList} onChange={changeHandle} placeholder="请选择地区"/>
          :
          <Cascader options={areaList} onChange={changeHandle} placeholder="请选择地区"/>
        }
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
    areaList: state.users.areaList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaSelect)
