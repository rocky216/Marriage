import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Form, Select, Row, Col, InputNumber, Input, Upload} from "antd"

const FormItem = Form.Item
const Option = Select.Option
const {TextArea} = Input

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  render(){
    const {getFieldDecorator} = this.props.form

    return (
      <div className="mgt10">
        <Card title="详情信息" >
          <Form>
            <Row gutter={24} >
              <Col span={24} >
                <FormItem label="积分" {...formItemLayout}>
                  {getFieldDecorator("integral")(
                    <InputNumber min={0} />
                  )}
                </FormItem>
              </Col>
              <Col span={24} >
                <FormItem label="学历" {...formItemLayout}>
                  {getFieldDecorator("education")(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={24} >
                <FormItem label="月薪" {...formItemLayout}>
                  {getFieldDecorator("salary")(
                    <Select>
                      <Option value="1">1000~2000</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label="个人简介" {...formItemLayout}>
                  {getFieldDecorator("description")(
                    <TextArea  rows={2} />
                  )}
                </FormItem>
              </Col>
              <Col span={24} >
                <FormItem label="详细地址" {...formItemLayout}>
                  {getFieldDecorator("address")(
                    <TextArea  rows={2} />
                  )}
                </FormItem>
              </Col>
              <Col span={24} >
                <FormItem label="上传图片" {...formItemLayout}>
                  {getFieldDecorator("imgs")(
                    <Upload />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserDetail))
