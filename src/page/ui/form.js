import React from 'react'
import {Icon,Spin,Input,Card,Form,Button,message, Checkbox} from 'antd'
import './common.less'

const FormItem = Form.Item;
class FormLogin extends React.Component{
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldDecorator;
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                message.success(`${values.userName}恭喜你，账号校验通过，你的密码为：${values.userPwd}`);
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const icon = <Icon type="loading" style={{fontSize:24}}></Icon>
        
        return(
            <div>
                <Card title="登入行内表单">
                    <Form layout="inline">     
                        <FormItem>
                            <Input placeholder="请输入用户名">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button>确认</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="登入水平表单">
                    <Form style={{width:250}}>
                        <FormItem>
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
                                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入用户名"></Input>)   
                                
                            }
                        </FormItem>
                        <FormItem>
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
                                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password" placeholder="请输入密码"></Input>)   
                            }
                        </FormItem>
                        
                        <FormItem>
                            {
                                getFieldDecorator('remeber',{
                                    valuePropName:'checked',
                                    initialValue:true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )   
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.handleSubmit}>确认</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormLogin);
