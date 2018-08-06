import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Jcard from "components/Jcard"
import {Card, Form, Row, Col, Button, Select, Input, InputNumber, DatePicker, Upload, Icon} from "antd"
import {getUserDetail} from "actions/userAction"
import AreaSelect from "components/AreaSelect"
import moment from "moment"

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

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      area: [],
      imageUrl: '',
      fileList: []
    }
  }
  componentDidMount(){
    this.props.actions.getUserDetail({id: this.props.params.id})
  }
  componentWillReceiveProps(nextProps){
    const {userBase} = nextProps

    let area = userBase && userBase.province?[userBase.province.toString(), userBase.city.toString(),
        userBase.area.toString()]:[]
        this.setState({area,
          fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              }]
        })

  }
  getAreaChange(value){
    this.setState({area: value})
  }
  changeImg(){

  }
  render(){
    const {getFieldDecorator } = this.props.form
    const {spending, userBase} = this.props
    const {area , imageUrl} = this.state
    let birthday = userBase && userBase.birthday?moment(userBase.birthday).format("YYYY-MM-DD"):''

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    )
    const fileList = [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }];
    const props = {
       action: '/uploadImg',
       name: "avatar",
       listType: 'picture',
       defaultFileList: [...fileList],
       onChange: this.changeImg.bind(this)
    }
    console.log(fileList, 66);
    return (
      <Jcard spinning={spending} >
        <Card title="基本信息">
          <Row>
            <Col span={8}>
              <FormItem label="姓名" {...formItemLayout}>
                {getFieldDecorator("username", {
                  initialValue: userBase?userBase.username:'',
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
                  initialValue: userBase && userBase.sex ?"1":"0",
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
                  initialValue: userBase?userBase.age:"",
                  rules: [{
                    required: true,
                    message: '不能为空！',
                  }],
                })(
                  <InputNumber min={0} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="手机号" {...formItemLayout}>
                {getFieldDecorator("mobile", {
                  initialValue: userBase?userBase.mobile:"",
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
                {getFieldDecorator("nickname",{
                  initialValue: userBase?userBase.nickname:"",
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="出生日期" {...formItemLayout}>
                {getFieldDecorator("birthday", {
                  initialValue: birthday? moment(birthday, "YYYY-MM-DD"):moment()
                })(
                  <DatePicker  placeholder="选择日期" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="省/市/区" {...formItemLayout}>
                <AreaSelect defaultArea={area}  changeHandle={this.getAreaChange.bind(this)}/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="身份证号" {...formItemLayout}>
                {getFieldDecorator("idcard", {
                  initialValue: userBase?userBase.idcard:"",
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="个性签名" {...formItemLayout}>
                {getFieldDecorator("signature", {
                  initialValue: userBase?userBase.signature:"",
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="上传头像" {...formItemLayout}>
                <Upload
                    style={{ width: "128px", height: "128px"}}
                    {...props}
                  >
                  {uploadButton}
                </Upload>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Jcard>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getUserDetail}, dispatch)
  }
}

function mapStateToProps(state){
  return {
    userBase: state.users.userBase,
    spending: state.users.spending
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditUser))
