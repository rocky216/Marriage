import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {browserHistory} from "react-router"
import {Card, Form, Button, Input, Checkbox, Icon} from "antd"
import {login} from "actions/userAction"
import {setCookie} from "utils"

const FormItem = Form.Item

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.login(values, (data)=>{
          setCookie("stoken", data.token)
          browserHistory.push("/")
        })
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <Card title="登录">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({login}, dispatch)
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
