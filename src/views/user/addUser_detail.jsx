import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {browserHistory } from "react-router"
import {Card, Form, Select, Row, Col, InputNumber, Input, Upload, Button, Icon} from "antd"
import {getEduSal} from "actions/userAction"
import {addUser} from "actions/userAction"
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

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      imgsUrls: ''
    }
  }
  componentDidMount(){
    this.props.actions.getEduSal()
  }
  handleSubmit(e){
    const {imgsUrls} = this.state
    this.props.prevform.validateFieldsAndScroll((err, values)=>{
      this.props.form.validateFields((err2, detailvaue) => {
        if (!err) {
          const {imageUrl, ereaIds} = this.props
          let newValues = _.assign({},values,{
            headimg: imageUrl,
            birthday: moment(values.birthday).format("YYYY-MM-DD"),
            province: ereaIds?ereaIds[0]:'',
            city: ereaIds?ereaIds[1]:'',
            area: ereaIds?ereaIds[2]:''
          },detailvaue, {
            imgs: imgsUrls
          })
          this.props.actions.addUser(newValues)
        }
      });
    })

  }
  changeImg(event){
    if (event.file.status=="done") {
      var arr = []
      _.each(event.fileList, (item)=>{
        if (item.response) {
          arr.push(item.response.path)
        }
      })
      this.setState({imgsUrls: arr.join()})
    }  
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {education, salary} = this.props

    return (
      <div className="mgt10">
        <Card title="详情信息" >
          <Form >
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
                  <Button className="mgr10" onClick={()=>browserHistory.push("/user")} ><Icon type="close"/>取消</Button>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)} ><Icon type="save"/>保存</Button>
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
    actions: bindActionCreators({getEduSal, addUser}, dispatch)
  }
}

function mapStateToProps(state){
  return {
    education: state.users.education,
    salary: state.users.salary
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserDetail))
