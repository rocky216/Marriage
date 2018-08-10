import React from "react"
import {Route, IndexRedirect } from "react-router"
import App from "views/app"
import Home from "views/home"
import User from "views/user"
import AddUser from "views/user/addUser"
import Login from "views/login"
import UserDetail from "views/user/userDetail"
import EditUser from "views/user/editUser"
import AddBanner from "views/addbanner"

export default ()=>(
  <Route>
    <Route path="/" component={App}>
      <IndexRedirect to="/home"/>
      <Route path="/home" component={Home}/>
      <Route path="/user" component={User} />
      <Route path="/addUser" component={AddUser} />
      <Route path="/editUser/:id" component={EditUser} />
      <Route path="/userdetail/:id" component={UserDetail} />
      <Route path="/addbanner" component={AddBanner} />
    </Route>
    <Route path="/login" component={Login} />
  </Route>
)
