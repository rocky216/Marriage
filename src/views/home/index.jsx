import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getAdmin} from "actions/homeAction"


class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    
  }
  render(){
    return (
      <div>home</div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getAdmin}, dispatch)
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
