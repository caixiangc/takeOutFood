import React from 'react'
import JsonP from 'jsonp'
import axios from 'axios'
import axioss from 'axios'
import Axios from './../../axios/index'


import {
    Form, Input, DatePicker, Icon, Select , Radio, InputNumber, message, Upload, Checkbox, Button, AutoComplete,Switch, Card
  } from 'antd';
import moment from 'moment'

  const FormItem = Form.Item;
  const RadioGroup = Radio.Group;
  const Option = Select.Option;
  const { TextArea } = Input;
  var token;
  var qiniudata = {
     token: '',
    //永久token
    //GDAqqvfcRKUTnvnvQXPnLY_1H2Issyuwit1mvE54:oC1G1WRzA44gOQ9fyoiLIf1E0Xg=:eyJzY29wZSI6ImJpc2hlIiwicmV0dXJuQm9keSI6IntcImtleVwiOlwiJChrZXkpXCIsXCJoYXNoXCI6XCIkKGV0YWcpXCIsXCJidWNrZXRcIjpcIiQoYnVja2V0KVwiLFwiZnNpemVcIjokKGZzaXplKSxcImZuYW1lXCI6JChmbmFtZSksXCJlbmRVc2VyXCI6JChlbmRVc2VyKX0iLCJkZWFkbGluZSI6MTkwNzEwOTI3MX0=
}
class RegisterForm extends React.Component{

    state={
        userImg:'',
        realUrl:''
    }


    componentDidMount(){
        //to-do
        axioss.get('http://www.cxnei.cn:8060/user/getToken')
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            
            //token = response.data.token;
            qiniudata.token = response.data.token;
            console.log("get a new qiniudata.token:"+qiniudata.token)

        })
        .catch(function (error) {
            console.log(error);
        });


        // Axios.jsonp({
        //    url:'http://localhost:8060/user/getToken'
        // }).then((res)=>{ // 这里要.then() 那么 Axios.jsonp()必须要return一个Promise
        //    qiniudata.token = res.data.token;
        //    console.log("get a new qiniudata.token:"+qiniudata.token)
        // })



    }

    QINIU_SERVER = 'http://up.qiniu.com'
    

    handleChangeInterest(value) {
        console.log(`Selected: ${value}`);
    }
    onChangeBirthday(date, dateString) {
        console.log(dateString);
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img); 
    }

    
    handleChangeUpload = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg:imageUrl,
            loading: false,
            realUrl:"http://pl06e79qx.bkt.clouddn.com/"+info.file.response.key+"?imageView2/1/w/200/h/200/q/75|watermark/2/text/emlzdUBjeA==/font/5a6L5L2T/fontsize/280/fill/I0U0MjEyMQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim",
          }));
        }
      }
    
    handleSubmitReset = () => {
        this.props.form.resetFields();
      }
    
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldDecorator;
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                message.success(`提交成功`);
                console.log(JSON.stringify(values));
            }
        })
    }

    beforeUpload(file) {

        const isJPG = file.type === 'image/jpeg';
        
        if (!isJPG) {
          message.error('You can only upload image file!');
        }
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
          message.error('Image must smaller than 4MB!');
        }
        
        return isJPG && isLt4M;
      }







    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayOut = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:20
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );


        return(
            <div>
                <Card title="注册基本控件"> 
                    <Form layout="horizontal" >
                        <FormItem label="username" {...formItemLayOut}>
                            {
                                getFieldDecorator('userName',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'please input you username'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:"必须英文字母或者数字"
                                        }
                                    ],
                                })(<Input  placeholder="请输入用户名"></Input>)   
                            }
                        </FormItem>
                        <FormItem label="password" {...formItemLayOut}>
                            {
                                getFieldDecorator('userPwd',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'please input you password'
                                        },
                                        {
                                            min:5,max:10,
                                            message:"密码长度不符合要求"
                                        },
                                        ,
                                        {
                                            pattern:/^\w+$/g,
                                            message:"必须英文字母或者数字"
                                        }
                                        
                                ],
                                })(<Input type="password" placeholder="请输入密码"></Input>)   
                            }
                        </FormItem>
                        
                        <FormItem label="性别" {...formItemLayOut}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:1
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </RadioGroup>
                                )   
                            }
                        </FormItem>

                        <FormItem label="年龄" {...formItemLayOut}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:18
                                })(
                                    <InputNumber/>
                                )   
                            }
                        </FormItem>

                        <FormItem label="状态" {...formItemLayOut}>
                            {
                                getFieldDecorator('statue',{
                                    initialValue:"caixiang"
                                })(
                                    <Select mode="multiple">
                                        <Option value="caixiang">caixiang</Option>
                                        <Option value="shaotian">shaotian</Option>
                                        <Option value="fenhua">fenhua</Option>
                                    </Select>
                                )   
                            }
                        </FormItem>

                        <FormItem label="兴趣" {...formItemLayOut}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue:["1","2"]
                                })(
                                    <Select mode="multiple" onChange={this.handleChangeInterest}>
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">骑行</Option>
                                        <Option value="7">桌球</Option>
                                        <Option value="8">麦霸</Option>
                                    </Select>
                                )   
                            }
                        </FormItem>

                        <FormItem label="是否已婚" {...formItemLayOut}>
                            {
                                getFieldDecorator('isMarry',{
                                    valuePropName:'checked',
                                    initialValue:true
                                })(
                                    <Switch></Switch>
                                )   
                            }
                        </FormItem>

                        <FormItem label="生日" {...formItemLayOut}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue: moment('2019-02-09')
                                })(
                                    <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onChange={this.onChangeBirthday} />
                                )   
                            }
                        </FormItem>

                        <FormItem label="联系地址" {...formItemLayOut}>
                            {
                                getFieldDecorator('address',{
                                    initialValue: 'heiheihei'
                                })(
                                    <TextArea autosize={true}/>
                                )   
                            }
                        </FormItem>

                        <FormItem label="早起时间" {...formItemLayOut}>
                            {
                                getFieldDecorator('wakeupTime')(
                                    <DatePicker ></DatePicker>
                                )   
                            }
                        </FormItem>

                        <FormItem label="早起时间" {...formItemLayOut}>
                            {
                                getFieldDecorator('wakeupTime')(
                                    <DatePicker ></DatePicker>
                                )   
                            }
                        </FormItem>

                        <FormItem label="上传头像" {...formItemLayOut}>
                            {
                                getFieldDecorator('uploadA')(
                                    <Upload
                                    accept="image/*"
                                    name="file"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    data={qiniudata}
                                    action={this.QINIU_SERVER}
                                    //action="localhost:8060/uploadImg"
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChangeUpload}
                                  >
                                    {this.state.realUrl ? <img src={this.state.realUrl} alt="avatar" /> : uploadButton}
                                  </Upload>
                                )   
                            }
                        </FormItem>
                        
                        <FormItem
                            {...formItemLayOut}
                            label="Upload"
                            extra="longgggggggggggggggggggggggggggggggggg"
                            >
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                
                                   
                                <Upload showUploadList={false}>
                                <Button>
                                    <Icon type="upload" /> 上传文件
                                </Button>
                                </Upload>

                                
                            )}
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>我已近阅读 <a href="#">浙江外国语答辩协议</a></Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit} htmlType="submit">注册</Button>
                            <Button type="primary" onClick={this.handleSubmitReset} htmlType="reset">重置</Button>
                        </FormItem>
                        <Button>{this.state.realUrl}</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(RegisterForm);
