import React from 'react'
import axios from './../../axios/index'
import axioss from 'axios'

import './index.less'
import { Layout, Menu,Tag,Popconfirm  , Card,Breadcrumb, Avatar ,Select,Col ,Input ,Radio,message,Button  , Dropdown, Icon ,Modal ,Form, Pagination , Row,Badge,Upload ,Switch } from 'antd';
import Utils from './../../utils/utils'
import CTable from './../../components/CTable/index'

const { Header, Content, Footer } = Layout;
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const { Meta } = Card;
const Option = Select.Option;

const MenuItem = Menu.Item;
const FormItem = Form.Item;
let buyCarslists = []
export default class ShopIndex extends React.Component{
        
    params={
        categoryId:1,
        page:0,
        size:12
    }
    paramsName={
        buyerName:"",
        page:1,
        size:12
    }
    
    state={
        logined:true,
        isLoginVisible:false,
        isRegisterVisible:false,
        isModifyVisible:false,
        type:"zhuce",   
        loading:true, 
        list:[],
        count:0,
        showBuyCar:[],
        isBuyCarVisible:false,
        avatar:'',
        isOrderDetailVisible:false,
        selectedId:[],
        totalPrice:0
    }
    
    
    handleLogin = ()=>{
        this.setState({
            isLoginVisible:true
        })
    }
    handleBuyCar = ()=>{
        this.setState({
            isBuyCarVisible:true
        })
        
        let total = this.state.totalPrice;
        total = 0;
        let showBuyCars = this.state.showBuyCar;
        //showMap-begin
        showBuyCars.map((item,index)=>{
            
            total += item.allPrice;  
        })
        //console.log(this.state.showBuyCar)
        // this.state.showBuyCar.map((item)=>{
        //     //todo
        // })
        this.setState({
            totalPrice:total
        })
    }
    showbuycatss = ()=>{
        console.log(this.state.showBuyCar)
    }

    handleMenuClick = (type)=>{
        console.log(type);
        this.params.categoryId = type.key;
        axios.unTableRequestList(this,'/buyer/product/categoryList',this.params,false,"get");

    }

    handleResign = ()=>{
        this.setState({
            isRegisterVisible:true
        })
    }
    getInterest = (state)=>{  //注意这种写法，依据state的内容，选择性return相对应的内容
        return{
            '1':'游戏',
            '2':'打篮球',
            '3':'踢足球',
            '4':'跑步',
            '5':'爬山',
            '6':'骑行',
            '7':'桌球',
            '8':'麦霸',
        }[state]   
    }

    handleSubmit = ()=>{
        let data = this.registerForm.props.form.getFieldsValue();
        let c = "http://pl06e79qx.bkt.clouddn.com/"+data.uploadA.file.response.key+"?imageView2/1/w/200/h/200/q/75|watermark/2/text/emlzdUBjeA==/font/5a6L5L2T/fontsize/280/fill/I0U0MjEyMQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim"
        data.uploadA = c;
        let interests="";
        data.interest.map((item,index)=>{
            interests+= this.getInterest(item)+",";
        })
        if(data.isMarry){
            data.isMarry = 0;
        }else{
            data.isMarry = 1;
        }
        data.interest = interests;
        axios.ajax({
            url:"/user/updateUser",
            data:{
                params:data
            },
            methods:'post',
            isMock:false
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isRegisterVisible:false
                })
                this.registerForm.props.form.resetFields();
                message.success('恭喜 '+res.data.nickName+'注册成功！');
            }
        })
        
    }
    componentDidUpdate(){
        this.updateInfo();
        //this.showbuycatss();
    }

    updateInfo = ()=>{
        let userInfo = this.state.userInfo;
        this.setState({
            userName:userInfo.username,
            userAddress:userInfo.userAddress,
            userSex:userInfo.userSex,
            userPayword:userInfo.Payword,
            nickName:userInfo.nickName,
            userMony:userInfo.userMony,
            avatar:userInfo.avator,
            userPhone:userInfo.userPhone
        })
    }

    handleModifySubmit = ()=>{
        let data = this.ModifyForm.props.form.getFieldsValue();
        let c="";
        if(data.uploadA.file){
            c = "http://pl06e79qx.bkt.clouddn.com/"+data.uploadA.file.response.key+"?imageView2/1/w/200/h/200/q/75|watermark/2/text/emlzdUBjeA==/font/5a6L5L2T/fontsize/280/fill/I0U0MjEyMQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim"
        }
        data.uploadA = c;


        let interests="";
        data.interest.map((item,index)=>{
            interests+= this.getInterest(item)+",";
        })
        if(data.isMarry){
            data.isMarry = 0;
        }else{
            data.isMarry = 1;
        }
        data.interest = interests;
        axios.ajax({
            url:"/user/updateUser",
            data:{
                params:data
            },
            methods:'post',
            isMock:false
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isModifyVisible:false,
                    userInfo:res.data,
                })
                this.updateInfo();
                this.ModifyForm.props.form.resetFields();
                message.success('恭喜 '+res.data.nickName+'个人信息修改成功！');
            }
        })

    }

    handleLoginSubmit = ()=>{
        let data = this.LoginForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/user/login',
            isMock:false,
            methods:'post',
            data:{
                params:data   //这里式可以把对象当做参数传过去的，但是需要注意这里对象对应的参数名要和后台接口的参数名对象，否者请求不到后台接口。
            }
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isLoginVisible:false,
                    userName:res.data.nickName,
                    logined:false,
                    userInfo:res.data,
                })
                this.updateInfo();
                message.success('登入成功！欢迎：'+res.data.nickName);

            }
        })
    }

    handleSetUserInfo = ()=>{
        this.setState({
            type:"modify",
            isModifyVisible:true
        })

    }

    componentWillMount(){
        this.requestList();        
        
    }
    handleChangeInterest(value) {
        console.log(`Selected: ${value}`);
    }
    componentDidMount(){
        this.setState({
            loading:false
        })
    }
    componentDidUpdate(){  //每次在外部setState之后。都要在这里调用之前set 过的样式因为这里的setState已经是更新过了的，这个函数每次跟新都会调用。
        //console.log(this.state.list);
        //document.getElementById("innerHtml").innerHTML=this.state.list;
        // this.setState({
        //     list
        // })

    }

    requestList = ()=>{
        
        axios.unTableRequestList(this,'/buyer/product/categoryList',this.params,false,"get");
        //document.getElementById("innerHtml").innerHTML=this.state.list
    }


    handlePageChange = (page,pageSize)=>{
        console.log("page:"+page+""+",pageSize:"+pageSize);
        this.params.page = (page-1);
        axios.unTableRequestList(this,'/buyer/product/categoryList',this.params,false,"get");
    }

    // handleOrderPageChange = ()=>{
    //     console.log("page:"+page+""+",pageSize:"+pageSize);
    //     this.params.page = (page-1);
    //     axios.unTableRequestList(this,'/buyer/product/categoryList',this.params,false,"get");
    // }

    

    selectedItema = (e)=>{
        
        console.log(e);
    }
    buNow = (e,pn,pp)=>{ //e=商品id，pn=商品名字，pp=商品价格
        let showFlag = false;
        let showBuyCars = this.state.showBuyCar;
        //showMap-begin
        showBuyCars.map((item,index)=>{
            if(item.productId==e){
                item.productQuantity+=1;
                item.allPrice +=pp;
                showFlag = true;
            }
        })
        
        if(!showFlag){
            showBuyCars.push({productName:pn,productPrice:pp,productQuantity:1,allPrice:pp,productId:e})
        }

        this.setState({
            showBuyCar:showBuyCars
        })
        //showMap-end


        let c = this.state.count+1;
        this.setState({
            count:c
        })
    }

    requestDetailListin = ()=>{
        axios.requestDetailList(this,'/buyer/order/getCountByName',this.paramsName,false,"get")
    }
    handleMyOrder = ()=>{
        this.setState({
            isOrderDetailVisible:true
        })
        this.paramsName.buyerName = this.state.userName;
        this.paramsName.page = 1;
        this.requestDetailListin();
    }

    orderOnSubmit = ()=>{
        this.setState({
            isOrderDetailVisible:false
        })
    }

    handleSubmitOrder = ()=>{
        let orderAmount = this.state.totalPrice;
        let buyerName = this.state.userName;
        let buyerPhone = this.state.userPhone;
        let buyerAddress = this.state.userAddress;
        let orderId = (new Date()).valueOf();
        let datas={
            orderAmount,
            buyerName,
            buyerPhone,
            buyerAddress,
            orderId:orderId,
        }
        axios.ajax({
            url:'/user/addOrderMaster',
            data:{
                params:datas
            },
            methods:'post',
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
                window.open(`/#/payment/order/${orderId}`,"_blank")

            }
        })
    }

    

    deleteSelectedItems = ()=>{
       let ids = this.state.selectedId;
       let source = this.state.showBuyCar;
       let result = [];
       let total = this.state.totalPrice;
       ids.map((item,index)=>{
            
            this.state.count -=1;
       })
       source.map((i,index)=>{
            let flag = 0;
            ids.map((j,index)=>{
                if(i.productId == j){
                    flag=1;
                    total -= i.productPrice;
                    return;
                }
            })
            if(flag==0){
                result.push(i);
            }

       })
       
       this.setState({
            showBuyCar:result,
            totalPrice:total,
            selectedRowKeys:[],
            selectedId:[]
       })   
    }

    

    render(){
        const text = '真的要删除此订单吗?';
        const menu = (
            <Menu>
              <MenuItem>
                <a target="_blank" rel="noopener noreferrer" onClick={this.handleSetUserInfo}>用户设置</a>
              </MenuItem>
              <MenuItem>
                <a target="_blank" rel="noopener noreferrer" onClick={this.handleMyOrder}>我的订单</a>
              </MenuItem>
              <MenuItem>
                <a target="_self" rel="noopener noreferrer" href="http://localhost:3000/#/shop">退出登入</a>
              </MenuItem>
            </Menu>
          )

          const menus = (
            <Menu>
              <MenuItem>
                    {/* <Button onClick={this.handleLogin}>登入</Button> */}
                    <a  onClick={this.handleLogin}>登入</a>
              </MenuItem>
              <MenuItem>
                    <a onClick={this.handleResign}>注册</a>
              </MenuItem>
            </Menu>
          )
          

          const columns = [
            {
                title:'商品名称',
                dataIndex:'productName'
            },{
                title:'价格',
                dataIndex:'productPrice'
            },{
                title:'数量',
                dataIndex:'productQuantity',
            },{
                title:'总价',
                dataIndex:'allPrice'
            },
        ]
        function delConfirm(e){
            let datas={
                id:e
            }
            axios.ajax({
                url:'/user/delete',
                data:{
                    params:datas
                },
                methods:'post',
                isMock:false
            }).then((res)=>{
                if(res.code==0){
                    //todo
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
                    console.log(document.getElementById("tipdel"))
                    message.success("id:"+e+"的订单删除成功")
                }
            })
            console.log(e);
        }
        function fmtDate(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        }
           
        const orderTailColumns = [ 
            {
                title:'购买人',
                dataIndex:'buyerName'
            },{
                title:'收获地址',
                dataIndex:'buyerAddress',
            },{
                title:'订单总额',
                dataIndex:'orderAmount'
            },{
                title:'订单状态',
                dataIndex:'orderStatus', // 0 ,1
                render(orderStatus){
                    if(orderStatus==0){
                        return "已下单"
                    }else{
                        return "未下单"
                    }
                }
            },{
                title:'支付状态',
                dataIndex:'payStatus',// 0 ,1
                render(payStatus){
                    if(payStatus==0){
                        return "已支付"
                    }else{
                        return "未支付"
                    }
                }
            },{
                title:'下单时间',
                dataIndex:'createTime',//转成日期格式
                render(createTime){
                    return fmtDate(createTime)
                }
            },{
                title:'操作',
                dataIndex:'orderId',
                render(orderId){  //对渲染出来的数据这里进行统一处理，进行统一查询字典
                    return       <Popconfirm placement="topLeft" title={text} onConfirm={()=>delConfirm(orderId)} okText="嗯.." cancelText="不删..">
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                }
            },
        ]
        return(<div>
             <Layout className="layout">
                <Header>
                    <Row>
                        <Col span={18}>
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}

                                onClick={this.handleMenuClick}
                            >
                                <Menu.Item key="3">甜点</Menu.Item>
                                <Menu.Item key="4">水果</Menu.Item>
                                <Menu.Item key="5">套餐</Menu.Item>
                                <Menu.Item key="6">单点</Menu.Item>
                                <Menu.Item key="7">小吃</Menu.Item>
                                <Menu.Item key="2">饮料</Menu.Item>
                                <Menu.Item key="1">面食</Menu.Item>
                                <Menu.Item key="90">主食</Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={6} className="userInfo">
                            {
                                this.state.logined? <Dropdown overlay={menus} >
                                    <a className="ant-dropdown-link" href="#" style={{color:"white"}}>
                                    登入/注册<Icon type="down" />                     
                                    </a>
                                </Dropdown>
                                :
                                <div>
                                    <Avatar size={32} src={this.state.avatar} icon="user" />
                                    <Dropdown overlay={menu} >
                                        <a className="ant-dropdown-link" href="#" style={{color:"white",marginLeft:20}}>
                                        欢迎：{this.state.nickName} <Icon type="down" />
                                        </a>
                                    </Dropdown>
                                    <a className="ant-dropdown-link" onClick={this.handleBuyCar} style={{color:"white",marginLeft:20}}>
                                        <Badge count={this.state.count}>
                                            购物车
                                        </Badge>
                                    </a>
                                </div>
                            }
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    
                    {/* 这里分页是通过 axios获取数据 然后存放到 list里面，然后页面去试碰有无数据 */}
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <div className="containers">
                           
                            {
                                this.state.list[0]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[0].productName} description={this.state.list[0].productDescription} /> 
                                    
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[0].productPrice}</Tag>
                                    </div>
                                    <div className="itemselect">     
                                        <Button onClick={()=>this.selectedItema(this.state.list[0].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[0].productId,this.state.list[0].productName,this.state.list[0].productPrice)} type="primary">加入购物车</Button>
                                    </div> 
                                </Card>
                            </div>:''
                            }
                            
                            {
                                this.state.list[1]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[1].productName} description={this.state.list[1].productDescription} /> 
                                        <div className="price">
                                            <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                            <Tag color="#f50">特价：{this.state.list[1].productPrice}</Tag>
                                        </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[1].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[1].productId,this.state.list[1].productName,this.state.list[1].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[2]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[2].productName} description={this.state.list[2].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[2].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[2].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[2].productId,this.state.list[2].productName,this.state.list[2].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[3]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[3].productName} description={this.state.list[3].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[3].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[3].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[3].productId,this.state.list[3].productName,this.state.list[3].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[4]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[4].productName} description={this.state.list[4].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[4].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[4].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[4].productId,this.state.list[4].productName,this.state.list[4].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[5]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[5].productName} description={this.state.list[5].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[5].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[5].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[5].productId,this.state.list[5].productName,this.state.list[5].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[6]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[6].productName} description={this.state.list[6].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[6].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[6].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[6].productId,this.state.list[6].productName,this.state.list[6].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[7]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[7].productName} description={this.state.list[7].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[7].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[7].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[7].productId,this.state.list[7].productName,this.state.list[7].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[8]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[8].productName} description={this.state.list[8].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[8].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[8].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[8].productId,this.state.list[8].productName,this.state.list[8].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[9]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[9].productName} description={this.state.list[9].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[9].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[9].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[9].productId,this.state.list[9].productName,this.state.list[9].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[10]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[10].productName} description={this.state.list[10].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[10].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[10].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[10].productId,this.state.list[10].productName,this.state.list[10].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[11]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[11].productName} description={this.state.list[11].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[11].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[11].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[11].productId,this.state.list[11].productName,this.state.list[11].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
                            {
                                this.state.list[12]?<div className="items">
                                <Card loading={this.state.loading} hoverable style={{ width: 300 }} cover={<img alt="example"  src="/assets/as.jpg"/>}> 
                                    <Meta title={this.state.list[12].productName} description={this.state.list[12].productDescription} /> 
                                    <div className="price">
                                        <Icon type="like" theme='filled' style={{marginTop: -7,fontSize: '30px',color:"#f50"}} />
                                        <Tag color="#f50">特价：{this.state.list[12].productPrice}</Tag>
                                    </div>
                                        <div className="itemselect"> 
                                        <Button onClick={()=>this.selectedItema(this.state.list[12].productId)} type="primary">立即购买</Button>
                                        <Button onClick={()=>this.buNow(this.state.list[12].productId,this.state.list[12].productName,this.state.list[12].productPrice)} type="primary">加入购物车</Button>
                                        </div> 
                                </Card>
                            </div>:''
                            }
 
                        </div>
                        <div style={{display:"block",paddingLeft:1000,marginTop:100}}>
                        <Pagination
                            defaultCurrent={1} 
                            pageSize={12}
                            onChange={this.handlePageChange}
                            total={this.state.total} 
                            showTotal={(total, range) => `当前是：${range[0]}-${range[1]} ，共 ${total} 条数据`}
                            
                            />
                            
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ZISU ©2018 Created by 17计算机-23-蔡翔
                </Footer>
            </Layout>

            <Modal
                title="注册"
                visible={this.state.isRegisterVisible}
                onOk={this.handleSubmit}
                onCancel={()=>{
                    this.setState({isRegisterVisible:false})
                    this.registerForm.props.form.resetFields();

                }}
            >
                <RegisterForm wrappedComponentRef={(inst)=>this.registerForm = inst}></RegisterForm> 

            </Modal>

            <Modal
                title="修改个人信息"
                visible={this.state.isModifyVisible}
                onOk={this.handleModifySubmit}
                onCancel={()=>{
                    this.setState({isModifyVisible:false})
                    this.ModifyForm.props.form.resetFields();
                }}
            >
                <RegisterForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.ModifyForm = inst}></RegisterForm> 

            </Modal>


            <Modal
                title="登入"
                visible={this.state.isLoginVisible}
                onCancel={()=>{
                    this.setState({isLoginVisible:false})
                }}
                onOk={this.handleLoginSubmit}
            >
                <LoginForm wrappedComponentRef={(inst)=>this.LoginForm = inst}></LoginForm> 

            </Modal>


            <Modal
                title="购物车页面"
                visible={this.state.isBuyCarVisible}
                onCancel={()=>{
                    this.setState({isBuyCarVisible:false})
                }}
                okText = "前去结算"
                cancelText = "我再看看"
                onOk = {this.handleSubmitOrder.bind(this)}
            >
                <CTable
                    columns={columns}
                    updateSelectedItem = {Utils.updateSelectedItem.bind(this)}  //这个updateSelectedItem是从CTable组件内部调用他的。
                    dataSource = {this.state.showBuyCar}  //这里的this.state.list 和axios.requestList() 返回的值的互通的。
                    pagination = {this.state.pagination}   //要分页就必须设置后面的 的等于{this.state.pagination}  因为 分页后调用回调，回调把改变后的信息都放在这里。
                    selectedRowKeys = {this.state.selectedRowKeys}  //只要在<Table> 中写了selectedRowKeys，我们就能选中后通过selectedRowkeys 获取数据
                    rowSelection='checkbox'
                />
                <div>总价：{this.state.totalPrice}</div>
                <Button type="danger" onClick={this.deleteSelectedItems.bind(this)}>删除所选</Button> 
            </Modal>                         

            <Modal
                title="我的订单"
                visible={this.state.isOrderDetailVisible}
                okText = "好的我知道了"
                cancelText = "退出"
                width="1000px"
                onOk = {this.orderOnSubmit}
                onCancel = {this.orderOnSubmit}
            >
                <CTable
                    columns={orderTailColumns}
                    //updateSelectedItem = {Utils.updateSelectedItem.bind(this)}  //这个updateSelectedItem是从CTable组件内部调用他的。
                    dataSource = {this.state.detailList}  //这里的this.state.list 和axios.requestList() 返回的值的互通的。
                    pagination = {this.state.pagination}   //要分页就必须设置后面的 的等于{this.state.pagination}  因为 分页后调用回调，回调把改变后的信息都放在这里。
                    selectedRowKeys = {this.state.selectedRowKeys}  //只要在<Table> 中写了selectedRowKeys，我们就能选中后通过selectedRowkeys 获取数据
                    rowSelection={null}
                />
                {/* <Button id="needEnter" onClick={this.requestDetailListin()}>needEnter</Button> */}
                {/* <Pagination
                            defaultCurrent={1} 
                            pageSize={12}
                            onChange={this.handleOrderPageChange}
                            total={this.state.total} 
                            showTotal={(total, range) => `当前是：${range[0]}-${range[1]} ，共 ${total} 条数据`}
                            
                            /> */}
                
            </Modal>
            </div>)
    }
}
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
    
    QINIU_SERVER = 'http://up.qiniu.com'
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
      getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img); 
    }


      handleChangeUpload = (info) => {
        let _this = this;
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => _this.setState({
            userImg:imageUrl,
            loading: false,
            realUrl:"http://pl06e79qx.bkt.clouddn.com/"+info.file.response.key+"?imageView2/1/w/200/h/200/q/75|watermark/2/text/emlzdUBjeA==/font/5a6L5L2T/fontsize/280/fill/I0U0MjEyMQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim",
          }));
        }
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
    }


    render(){
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        
        let type = this.props.type;
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
                        getFieldDecorator('username',{
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
                            initialValue:userInfo?userInfo.username:''
                        })(type=="modify"?<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} disabled placeholder="请输入用户名"></Input>
                        :
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入用户名"></Input>
                        )   
                        
                    }
                </FormItem>
                <FormItem label="手机号" {...formItemLayout}>
                    {
                        getFieldDecorator('userPhone',{
                            rules:[
                                {
                                    required:true,
                                    message:'please input you phone'
                                },
                                {
                                    message:'只能输入数字',
                                    pattern: /^[0-9]+$/
                                },
                                {
                                    min:11,max:11,
                                    message:"手机号码长度11位"
                                }
                            ],
                            initialValue:userInfo?userInfo.userPhone:''
                        })(type=="modify"?<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} disabled placeholder="请输入手机号码"></Input>
                        :
                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入手机号码"></Input>
                        )   
                        
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                    {
                        getFieldDecorator('password',{
                            rules:[
                                {
                                    required:true,
                                    message:'please input you password'
                                },
                                {
                                    min:6,max:10,
                                    message:"密码长度不符合要求"
                                },
                                ,
                                {
                                    pattern:/^\w+$/g,
                                    message:"必须英文字母或者数字"
                                }
                                
                        ],
                        initialValue:''
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password" value="" placeholder="请输入密码"></Input>)   
                    }
                </FormItem>

                <FormItem label="支付密码" {...formItemLayout}>
                        {
                            getFieldDecorator('payword',{
                                rules:[
                                    {
                                        required:true,
                                        message:'支付密码不为空'
                                    },
                                    {
                                        min:6,max:6,
                                        message:"请输入6位的支付密码"
                                    },
                                    {
                                        pattern:/^\w+$/g,
                                        message:"必须英文字母或者数字"
                                    }                                        
                                ],
                                initialValue:''
                            })(<Input prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password" placeholder="请输入密码"></Input>)   
                        }
                </FormItem>
                <FormItem label="是否已婚" {...formItemLayout}>
                    {
                        getFieldDecorator('isMarry',{
                            valuePropName:'checked',
                            initialValue:true
                        })(
                            <Switch></Switch>
                        )   
                    }
                </FormItem>
                <FormItem label="昵称" {...formItemLayout}>
                        {
                            
                            getFieldDecorator('nickname',{
                                rules:[
                                    {
                                        required:true,
                                        message:'昵称不能为空'
                                    }                                        
                                ],
                                initialValue:(type == 'modify')?userInfo.nickName:''
                            })(<Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="text"  placeholder="请输入昵称"></Input>)   
                        }
                </FormItem>

                <FormItem label="兴趣" {...formItemLayout}>
                    {
                        getFieldDecorator('interest',{
                            initialValue:[1,2]
                        })(
                            <Select mode="multiple" onChange={this.handleChangeInterest}>
                                <Option value={1}>游泳</Option>
                                <Option value={2}>打篮球</Option>
                                <Option value={3}>踢足球</Option>
                                <Option value={4}>跑步</Option>
                                <Option value={5}>爬山</Option>
                                <Option value={6}>骑行</Option>
                                <Option value={7}>桌球</Option>
                                <Option value={8}>麦霸</Option>
                            </Select>
                        )   
                    }
                </FormItem>

                <FormItem label="性别" {...formItemLayout}>
                    {
                        
                        getFieldDecorator("sex",{ 
                            initialValue:((type == 'modify')?userInfo.userSex:1)  //获取初始值
                        })( 
                            <RadioGroup>
                                <Radio value={1}>男</Radio> 
                                <Radio value={0}>女</Radio> 
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="上传头像" {...formItemLayout}>
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
                
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        getFieldDecorator("address",{
                            initialValue:(type == 'modify')?userInfo.userAddress:''
                        })( 
                            <TextArea row={3} placeholder="请输入联系地址">    
                            </TextArea>
                        )
                    }
                </FormItem>
            
            </Form>
        </div>)
    }
}
RegisterForm = Form.create({})(RegisterForm)


class LoginForm extends React.Component{

    render(){
        let type = this.props.type;
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
                        getFieldDecorator('username',{
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
                <FormItem label="密码" {...formItemLayout}>
                    {
                        getFieldDecorator('password',{
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
                {/* <FormItem label="密码" {...formItemLayout}>
                    <Button type="primary" onClick={this.handleLoginSubmit}>提交</Button>
                    <Button type="primary" onClick={()=>{this.props.form.resetFields()}}>清空</Button>
                </FormItem> */}
            </Form>
        </div>)
    }
}
LoginForm = Form.create({})(LoginForm)
