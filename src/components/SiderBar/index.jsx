import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router"
import {Layout, Menu, Icon} from "antd"
import menu from "./menu"

const {Sider} = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu;

class SiderBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <Sider>
        <div className="logo" style={{color:"#fff",height: "50px"}} >LOGO</div>
        <Menu  theme="dark" mode="inline" >
          {menu.map(item=>(
            <SubMenu
              key={item.key}
              title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
            >
              {item.children.map(elem=>(
                <MenuItem key={elem.key}>
                  <Link to={elem.link}>{elem.title}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    )
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps)(SiderBar)
