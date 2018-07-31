import "index.less"
import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {browserHistory} from "react-router"
import Jcard from "components/Jcard"
import {Form, Row, Col, Input, InputNumber, DatePicker, Card, Upload, Icon, Button, Select} from "antd"
import AreaSelect from "components/AreaSelect"
import moment from "moment"
import UserDetail from "./addUser_detail"
import {addUser} from "actions/userAction"


const FormItem = Form.Item
const Option = Select.Option

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
    this.state={
      loading: false,
      imageUrl: '',
      ereaIds:''
    }
  }
  componentDidMount(){

  }
  getAreaChange(value){
    this.setState({ereaIds: value})
  }
  beforeUpload(){

  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {imageUrl, ereaIds} = this.state
        let newValues = _.assign({},values,{
          headimg: imageUrl,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          province: ereaIds?ereaIds[0]:'',
          city: ereaIds?ereaIds[1]:'',
          area: ereaIds?ereaIds[2]:''
        })
        console.log(newValues);
        this.props.actions.addUser(newValues)
      }
    });
  }
  changeImg(event){
    console.log(event, 33);
    if (event.file && event.file.response) {
      this.setState({imageUrl: event.file.response.path})
    }
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {imageUrl} = this.state

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    )

    return (
      <Jcard>
        <Card title="基本信息">
          <Form onSubmit={this.handleSubmit.bind(this)} >
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
                    <Select >
                      <Option value="1">男</Option>
                      <Option value="0">女</Option>
                    </Select>
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
                    <InputNumber min={1} />
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
                <FormItem label="昵称" {...formItemLayout}>
                  {getFieldDecorator("nickname")(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="出生日期" {...formItemLayout}>
                  {getFieldDecorator("birthday")(
                    <DatePicker placeholder="选择日期" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="省/市/区" {...formItemLayout}>
                  <AreaSelect changeHandle={this.getAreaChange.bind(this)}/>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="密码" {...formItemLayout}>
                  {getFieldDecorator("password")(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="身份证号" {...formItemLayout}>
                  {getFieldDecorator("idcard")(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="个性签名" {...formItemLayout}>
                  {getFieldDecorator("signature")(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="上传头像" {...formItemLayout}>
                  <Upload
                      style={{ width: "128px", height: "128px"}}
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      action="/uploadImg"
                      onChange={this.changeImg.bind(this)}
                    >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{width:"100px",height: "100px"}} /> : uploadButton}
                  </Upload>
                </FormItem>
              </Col>
              <Col span={24}>
                <Button className="mgr10" onClick={()=>browserHistory.push("/user")}><Icon type="close" />取消</Button>
                <Button type="primary" htmlType="submit" ><Icon type="save" />保存</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <UserDetail/>
      </Jcard>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({addUser}, dispatch)
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddUser))
