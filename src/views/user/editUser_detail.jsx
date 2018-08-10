import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {browserHistory} from "react-router"
import {Form, Row, Col, Card, InputNumber, Select, Input, Upload, Button, Icon} from "antd"
import {getEduSal, editUser} from "actions/userAction"
import moment from "moment"


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

class EditUserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      imgsUrl: ''
    }
  }
  componentDidMount(){
    this.props.actions.getEduSal()
  }
  componentWillReceiveProps(nextProps){
    const {userDetail} = nextProps
    if (userDetail && userDetail.imgs) {
      var arr=[]
      _.each(userDetail.imgs.split(','), (item, index)=>{
        arr.push({
          uid: index*-1,
          status: 'done',
          url: item,
          thumbUrl: item
        })
      })
      this.setState({imgsUrl:arr})
    }
  }
  changeImg(){

  }
  normFile(e){
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  getImgs(arr){
    if (_.isArray(arr)) {
      var newArr= []
      _.each(arr, item=>{
        if (item.url) {
          newArr.push(item.url)
        }
        if (item.response) {
          newArr.push(item.response.path)
        }

      })
      return newArr.join()
    }
    return ''
  }
  handleSubmit(e){
    const {imageUrl} = this.props
    
    this.props.prevform.validateFieldsAndScroll((err, val)=>{
      if (!err) {
        this.props.form.validateFields((err, values)=>{
          let newValues = _.assign({}, val, values, {
            headimg: imageUrl?imageUrl[0]["url"]:'',
            imgs: this.getImgs(values.imgs),
            id: this.props.id,
            birthday: val.birthday?moment(val.birthday).format("YYYY-MM-DD"):''
          })
          this.props.actions.editUser(newValues, ()=>{
            browserHistory.push("/user")
          })
        })
      }

    })
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {education, salary, userDetail} = this.props
    const {imgsUrl} = this.state

    return (
      <Card title="详细信息" className="mgt10">
        <Form >
          <Row gutter={24}>
            <Col span={24} >
              <FormItem label="积分" {...formItemLayout}>
                {getFieldDecorator("integral", {
                  initialValue:userDetail && userDetail.integral?userDetail.integral:''
                })(
                  <InputNumber min={0} />
                )}
              </FormItem>
            </Col>
            <Col span={24} >
              <FormItem label="学历" {...formItemLayout}>
                {getFieldDecorator("education", {
                  initialValue: userDetail && userDetail.education?parseInt(userDetail.education):''
                })(
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
                {getFieldDecorator("salary", {
                  initialValue: userDetail&& userDetail.salary?parseInt(userDetail.salary):''
                })(
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
                {getFieldDecorator("description", {
                  initialValue: userDetail&&userDetail.description?userDetail.description:''
                })(
                  <TextArea  rows={2} />
                )}
              </FormItem>
            </Col>
            <Col span={24} >
              <FormItem label="详细地址" {...formItemLayout}>
                {getFieldDecorator("address", {
                  initialValue: userDetail && userDetail.address?userDetail.address:''
                })(
                  <TextArea  rows={2} />
                )}
              </FormItem>
            </Col>
            <Col span={24} >
              <FormItem label="上传图片" {...formItemLayout}>
                {getFieldDecorator("imgs", {
                  initialValue: imgsUrl,
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile,
                })(
                  <Upload
                    action="/uploadImg"
                    name="avatar"
                    multiple={true}
                    listType="picture"
                  >
                  <Button>多图上传</Button>
                </Upload>
                )}
              </FormItem>
            </Col>
            <Col span={24} >
              <FormItem {...formItemLayout}>
                <Button className="mgr10" onClick={()=>browserHistory.push("/user")} ><Icon type="close"/>取消</Button>
                <Button type="primary" onClick={this.handleSubmit.bind(this)} ><Icon type="save"/>保存</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({getEduSal, editUser}, dispatch)
  }
}

function mapStateToProps(state){
  return {
    userDetail: state.users.userDetail,
    education: state.users.education,
    salary: state.users.salary
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditUserDetail))
