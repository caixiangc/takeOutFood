import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import moment from 'moment';
import BaseForm from './../../components/BaseForm/index'
import CTable from './../../components/CTable/index'

const FormItem = Form.Item
const {RangePicker} = DatePicker;
  export default class Order extends React.Component{
    state={
        list:[],
        selectedIds:'',
        idListss:[],
    }
    params = {  //之所以 不设置成 params.page = 1 ;是因为，params里面有很多属性的
        page:1
    }

    formList = [
        {
            type:'SELECT',
            label:'城市',
            placeholder:'全部',
            field:'city', //这里的field 起名 是方便后续我们getField
            initialValue:'1',
            width:90,
            list:[{id:'0',name : '全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'上海'},{id:'4',name:'杭州'}]  //这些就是我们之后要遍历的选项
        },
        {
            type:"时间查询"
        },
        // {
        //     type:'INPUT',
        //     label:'模式',
        //     placeholder:'请输入模式',
        //     field:'mode', //这里的field 起名 是方便后续我们getField
        //     width:120,
        // },
        {
            type:'SELECT',
            label:'订单状态',
            field:'status',
            placeholder:'全部',
            initialValue:'1',
            width:90,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'已完结'}]
        },
    ]

    
    componentDidMount(){
        this.requestList();
        
    }
    handleFilter = (params)=>{  //这个参数是 BaseForm 传过来的，里面有获取来的所有我们填写表单的值
        this.params = params;  //传递参数通过BaseForm 形成特定的表格
        this.requestList();   
    }
    requestList = ()=>{
        let _this = this;
        
        axios.requestList(this,'/order/list',this.params,true);
        //api: 通过这条语句 会把返回的结果append到 this作用域下的list 里面，我们要用 直接this.list 就可以了
    }


     // 订单结束确认
     handleConfirm = ()=>{
        let item = this.state.selectedItem;  //selectedItem 必须有值才能才能结束订单，变相的判是否为空。
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单查看详情'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code ==0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        let selectedId = this.state.selectedId;  //返回的是一个idList 的字符串 如 "1,2,3"
        let idList = this.state.idListss;        //返回的是一个idList 的数组 如 [1,2,3]
        
        console.log("item:"+item);
        console.log("selectedId:"+selectedId);
        console.log("list:"+this.state.list);
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        window.open(`/#/common/order/detail/${idList[1]}/cxcx`,"_blank")
    }

      render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        return (
            <div>
                <Card>                                  
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card>
                    <Button id="Odetail" type="primary" onClick={this.openOrderDetail}>
                        订单详情
                    </Button>
                    <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>
                        结束订单
                    </Button>
                </Card>
                <Card className="operate-wrap">               
                    <CTable
                        columns={columns}
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        dataSource = {this.state.list}
                        pagination = {this.state.pagination}   //要分页就必须设置后面的 的等于{this.state.pagination}  因为 分页后调用回调，回调把改变后的信息都放在这里。
                        selectedRowKeys = {this.state.selectedRowKeys}  //只要在<Table> 中写了selectedRowKeys，我们就能选中后通过selectedRowkeys 获取数据
                        //selectedIds = {this.IdList}
                        //rowSelection = {false}
                        rowSelection='checkbox'
                    />
                </Card> 
            </div>
        )
    }
  }

