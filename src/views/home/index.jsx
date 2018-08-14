import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getAdmin, getSmallLogin} from "actions/homeAction"


class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    // this.props.actions.getSmallLogin()
  }
  render(){
    return (
      <div>home</div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getAdmin, getSmallLogin}, dispatch)
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
