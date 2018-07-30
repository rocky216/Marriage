import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Jcard from "components/Jcard"
import {Form, Row, Col, Input, InputNumber, DatePicker} from "antd"

const FormItem = Form.Item

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

class AddUser extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    
  }
  render(){
    const {getFieldDecorator } = this.props.form
    return (
      <Jcard>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="姓名" {...formItemLayout}>
                {getFieldDecorator("username", {
                  rules: [{
                    required: true,
                    message: '不能为空！',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="性别" {...formItemLayout}>
                {getFieldDecorator("sex", {
                  rules: [{
                    required: true,
                    message: '不能为空！',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="年龄" {...formItemLayout}>
                {getFieldDecorator("age", {
                  rules: [{
                    required: true,
                    message: '不能为空！',
                  }],
                })(
                  <InputNumber />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="手机号" {...formItemLayout}>
                {getFieldDecorator("mobile", {
                  rules: [{
                    required: true,
                    message: '不能为空！',
                  }],
                })(
                  <InputNumber style={{width: "100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="出生日期" {...formItemLayout}>
                {getFieldDecorator("birthday")(
                  <DatePicker  />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem label="省" {...formItemLayout}>
                {getFieldDecorator("province")(
                  <DatePicker  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Jcard>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddUser))
