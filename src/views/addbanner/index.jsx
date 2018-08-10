import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Jcard from "components/Jcard"
import {Table, Card, Row, Button, Icon, Modal, Form, Upload, Input, Popconfirm} from "antd"
import {addBanner, getBannerList, deleteBanner} from "actions/homeAction"
import columns from "./table-columns"
import {addIndex} from "utils"

const FormItem = Form.Item

class AddBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      visible: false
    }
  }
  componentDidMount(){
    this.props.actions.getBannerList()
  }
  handleOk(){
    this.props.form.validateFields((err, values)=>{
      console.log(values);
      if (!err) {
        let newValue = _.assign({},values, {
          save_path: values.save_path[0]["response"]["path"]
        })
        this.props.actions.addBanner(newValue, ()=>{
          this.setState({visible: false})
          this.props.actions.getBannerList()
        })
      }
    })
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && [e.fileList[e.fileList.length-1]];
  }
  deleteBanner(item){

    this.props.actions.deleteBanner({id: item.id}, ()=>{
      this.props.actions.getBannerList()
    })
  }
  getCol(){
    var _this = this
    return columns.concat([{
      title: "操作",
      render(text){
        return (
          <div>
            <Popconfirm title="是否删除！" onConfirm={_this.deleteBanner.bind(_this, text)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </div>
        )
      }
    }])
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {visible} = this.state
    const {bannerList, spending} = this.props
    return (
      <Jcard spinning={spending}>
        <Row className="mgb10">
          <Button type="primary" onClick={()=>this.setState({visible: true})}><Icon type="plus"/>添加Banner</Button>
        </Row>
        <Card title="banner列表">
          <Table
            columns={this.getCol()}
            dataSource={addIndex(bannerList)}
            ></Table>
        </Card>
        <Modal
          title="添加banner"
          visible={visible}
          onOk={this.handleOk.bind(this)}
          onCancel={()=>this.setState({visible: false})}
          >
          <Form>
            <FormItem label="标题">
              {getFieldDecorator("title", {
                rules: [
                  { required: true, message: '标题不能为空！' },
                ]
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="链接地址">
              {getFieldDecorator("url")(
                <Input/>
              )}
            </FormItem>
            <FormItem label="上传banner">
              {getFieldDecorator("save_path",{
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '图片不能为空！' },
                ]
              })(
                <Upload
                  name="avatar"
                  action="/uploadImg"
                  listType="picture"
                  >
                  <Button>上传图片</Button>
                </Upload>
              )}
            </FormItem>
          </Form>
        </Modal>

      </Jcard>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({addBanner, getBannerList, deleteBanner}, dispatch)
  }
}

function mapStateToProps(state){
  return {
    bannerList: state.home.bannerList,
    spending: state.home.spending
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddBanner))
