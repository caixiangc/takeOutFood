import React from 'react';
import axios from './../../axios/index'
import { Layout, Input , Card,Form,Icon,Col, Row,Modal,Button  } from 'antd';
const { Header, Content, Footer  } = Layout;

const FormItem = Form.Item
const TextArea = Input.TextArea
const InputPassword = Input.Password
export default class Payment extends React.Component{

    componentWillMount(){

        let orderId = this.props.match.params.orderId;//所有数据都是通过this.props去取，然后通过match.params去匹配一个叫orderId的东西
        this.requestList(orderId);        
        
    }
    state={
        list:[],
        createTimes:'',
        userPaywordInput:'',
        isPayVisible:false,
    }
    requestList = (orderId)=>{
        
        //axios.unTableRequestList(this,'/buyer/product/categoryList',this.params,false,"get");
        //document.getElementById("innerHtml").innerHTML=this.state.list
        
        let datas={
            id:orderId,
        }
        axios.ajax({
            url:'/user/getOrderMasterById',
            data:{
                params:datas
            },
            methods:'get',
            isMock:false
        }).then((res)=>{
            if(res.code==0){
                // let result =[];  //这是个思路但是这里行不通
                // this.state.detailList.map((item,index)=>{
                //     if(item.productId!=e){
                //         result.push(item);
                //     }
                // })
                // this.setState({
                //     detailList:result
                // })      
                //document.getElementById("tipdel").visible=true;
                //console.log(document.getElementById("tipdel"))
                //message.success("id:"+e+"的订单插入成功")
                //todo
                let createTimes = this.fmtDate(res.data.createTime);
                res.data.createTime = createTimes;
                this.setState({
                    list:res.data,
                })
            }
        })
    }
    fmtDate = (obj)=>{
        var date =  new Date(obj);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    }
    goPay = ()=>{
        //let data = this.OrderForm.props.form.getFieldsValue();
        // axios.ajax({
        //     url:"/user/updateUser",
        //     data:{
        //         params:data
        //     },
        //     methods:'post',
        //     isMock:false
        // }).then((res)=>{
        //     if(res.code==0){
        //         this.setState({
        //             isRegisterVisible:false
        //         })
        //         this.registerForm.props.form.resetFields();
        //         message.success('恭喜 '+res.data.nickName+'注册成功！');
        //     }
        // })

        this.setState({
            isPayVisible:true
        })
    }
    handlePaySubmit = ()=>{
        let payword = this.state.userPaywordInput;
        let buyerName = this.state.list.buyerName;
        let datas={
            userName:buyerName,
            payword:payword,
        }
        // axios.ajax({
        //     url:"/user/updateUser",
        //     data:{
        //         params:data
        //     },
        //     methods:'post',
        //     isMock:false
        // }).then((res)=>{
        //     if(res.code==0){
        //         this.setState({
        //             isRegisterVisible:false
        //         })
        //         this.registerForm.props.form.resetFields();
        //         message.success('恭喜 '+res.data.nickName+'注册成功！');
        //     }
        // })
    }


    render(){
        return(<div>
              <Layout className="layout">
                <Content style={{ padding: '5% 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Card title="订单结算" >
                        <OrderForm userInfo={this.state.list} wrappedComponentRef={(inst)=>this.OrderForm = inst}></OrderForm> 
                        <Button type="primary" style={{marginLeft:"16%"}} onClick={this.goPay}>确认支付</Button>
                        <Button type="primary">再看看</Button>
                    </Card>

                </div>

                <Modal
                    title="支付窗口"
                    visible={this.state.isPayVisible}
                    onOk={this.handlePaySubmit}
                    onCancel={()=>{
                        this.setState({isPayVisible:false})
                    }}
                >
                    <Row>
                        <Col span={6}>请输入支付密码</Col>
                        <Col span={18}>
                            <InputPassword placeholder="请输入你的支付密码" />
                            {/* <Input placeholder="Basic usage" /> */}
                        </Col>
                    </Row>
                </Modal>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                ZISU ©2018 Created by 17计算机-23-蔡翔
                </Footer>
            </Layout>
        </div>)
    }
}

class OrderForm extends React.Component{
    getState = (state)=>{  //注意这种写法，依据state的内容，选择性return相对应的内容
        return{
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子',
            '4':'zisu',
            '5':'毕设',
        }[state]   
    }
    render(){
        let userInfo = this.props.userInfo || {};
        const formItemLayout = {  
            labelCol:{span:5},
            wrapperCol:{span:19},
            
        }
        const {getFieldDecorator} = this.props.form; 
        return(<div>
            <Form layout="horizontal" >
            <FormItem label="用户名" {...formItemLayout}>
                {
                    userInfo?userInfo.buyerName:  //***注意这种写法是这样读取详情的 */
                    ''    
                    
                }
            </FormItem>
            

            <FormItem label="订单状态" {...formItemLayout}>
                {
                    userInfo.orderStatus==1?'订单已完结':  //***注意这种写法是这样读取详情的 */
                    '订单已生成'   
                }
            </FormItem>
            <FormItem label="订单状态" {...formItemLayout}>
                {
                    userInfo.payStatus==0?'未支付':  //***注意这种写法是这样读取详情的 */
                    '已支付'   
                }
            </FormItem>
            <FormItem label="订单总额" {...formItemLayout}>
                {
                    userInfo?userInfo.orderAmount+"元":  //***注意这种写法是这样读取详情的 */
                    0+"元" 
                }
            </FormItem>
            <FormItem label="手机号" {...formItemLayout}>
                {
                    userInfo?userInfo.buyerPhone:  //***注意这种写法是这样读取详情的 */
                    ''  
                }
            </FormItem>

            
            <FormItem label="联系地址" {...formItemLayout}>
                {
                    userInfo?userInfo.buyerAddress:  //***注意这种写法是这样读取详情的 */
                    '' 
                }
            </FormItem>
            <FormItem label="订单生成时间" {...formItemLayout}>
                {
                    userInfo?userInfo.createTime:''
                    
                }
            </FormItem>
            </Form>

            
        </div>)
    }
}
OrderForm = Form.create({})(OrderForm)  //通过Form.create 去生成这个表单