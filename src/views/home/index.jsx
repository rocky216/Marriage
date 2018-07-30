import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"


class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>home</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
