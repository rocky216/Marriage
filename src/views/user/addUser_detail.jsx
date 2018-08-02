import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Form, Select, Row, Col, InputNumber, Input, Upload, Button, Icon} from "antd"
import {getEduSal} from "actions/userAction"

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
    this.state={
      imgsUrl: ''
    }
  }
  componentDidMount(){
    this.props.actions.getEduSal()
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  changeImg(event){
    console.log(event);
    var arr = []
    if (event.file.status=="done") {
      _.each(event.fileList, (item)=>{
        arr.push(item.response.path)
      })
    }
    this.setState({imgsUrl: arr.join()})
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {education, salary} = this.props

    return (
      <div className="mgt10">
        <Card title="详情信息" >
          <Form onSubmit={this.handleSubmit.bind(this)}>
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
                    <Select>
                      {education?education.map(item=>(
                        <Option key={item.value} value={item.value}>{item.label}</Option>
                      )):''}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={24} >
                <FormItem label="月薪" {...formItemLayout}>
                  {getFieldDecorator("salary")(
                    <Select>
                      {salary?salary.map(item=>(
                        <Option key={item.value} value={item.value}>{item.label}</Option>
                      )):''}
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
                    <Upload
                      action="/uploadImg"
                      name="avatar"
                      multiple={true}
                      listType="picture"
                      onChange={this.changeImg.bind(this)}
                    >
                    <Button>多图上传</Button>
                  </Upload>
                  )}
                </FormItem>
              </Col>
              <Col span={24} >
                <FormItem {...formItemLayout}>
                  <Button className="mgr10"  ><Icon type="close"/>取消</Button>
                  <Button type="primary" htmlType="submit" ><Icon type="save"/>保存</Button>
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
    actions: bindActionCreators({getEduSal}, dispatch)
  }
}

function mapStateToProps(state){
  return {
    education: state.users.education,
    salary: state.users.salary
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserDetail))
