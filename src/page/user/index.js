import React from 'react'
import {Card,Button,Modal,Form, Input,Radio,DatePicker, Select, message,Table} from 'antd'

import axios from './../../axios/index'
import Utils from './../../utils/utils'
import CTable from './../../components/CTable/index'
import BaseForm from './../../components/BaseForm/index'
import moment  from 'moment';

const RadioGroup = Radio.Group
const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
export default class User extends React.Component{
    params={
        page:1
    }
    state={
        isVisible:false
    }
    formList = [
        {
            type:'INPUT',
            label:'用户名',
            placeholder:'请输入用户名',
            field:'user_name', //这里的field 起名 是方便后续我们getField
            width:115,
        },
        {
            type:'SELECT',
            label:'用户类型',
            placeholder:'全部',
            field:'user_type', //这里的field 起名 是方便后续我们getField
            initialValue:'0',
            width:120,
            list:[{id:'0',name : '全部'},{id:'1',name:'普通用户'},{id:'2',name:'会员'}]  //这些就是我们之后要遍历的选项
        },
        {
            type:'DATEPICKER',
            label:'请选择入职日期',
            placeholder:'请输入日期',
            field:'user_date', //这里的field 起名 是方便后续我们getField
        },
    ]

    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params)=>{
        this.params = params;// 这里没有用到page 那个属性。
        this.requestList();
    }
    requestList = ()=>{
        axios.requestList(this,'/user/list',this.params)   //调用这个方法会把得到的数据 存在this.state.list 里面
    }
    handleOperate = (type)=>{
        let item = this.state.selectedItem;  //
        if(type == 'create'){
            this.setState({
                title:'创建员工',
                isVisible:true,
                type
            })
        }else if(type == 'edit'){
            if(!item){
                message.warning('选择一条信息进行修改');
                return; //必须要return 不然会还会继续执行后面的程序
            }
            this.setState({
                title:'编辑员工',
                isVisible:true,
                type,
                userInfo:item  //这个userInfo的信息，是通过antd 的table内置的selectedItem获取来的
            })
        }else if(type == 'detail'){
            if(!item){
                message.warning('选择一条信息进行查看员工详情');
                return; //必须要return 不然会还会继续执行后面的程序
            }
            this.setState({
                title:'查看详情',
                isVisible:true,
                type,
                userInfo:item  //这个userInfo的信息，是通过antd 的table内置的selectedItem获取来的
            })
        }else{
            if(!item){
                message.warning('选择一条信息进行删除');
                return; //必须要return 不然会还会继续执行后面的程序
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前要选中的员工',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code==0){
                            _this.setState({   //注意这里的this是这个单页引用的根节点的域，并不是Modal()的域，如果在modal中写this，那么这个this的域指的是modal的域。
                                isVisible:false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    handleSubmit = ()=>{
        let type = this.state.type; //注意这个的type不是参数传过来的而是放在this.state里面的type
        let data = this.userForm.props.form.getFieldsValue();//获取userForm表单里面的数据，因为是通过antd来创建的，并且是挂载到this这个全局，所以我们可以通过全局去拿    
        axios.ajax({   //this.userForm注意这里填的是this.userForm不是UserForm,UserForm 是类名，
            //不能直接调用，要通过wrappedComponentRef={(inst)=>this.userForm = inst} 把获取到的数据对象（这里是一个大对象，我们只要form，所以就只获取form，也就是form.props.form）存放在一个新的名字 userForm里面。
            url:type=='create'?'/user/add':'/user/edit', //****这里是个技巧，判断type是不是create，如果是就要选用add那个url，如果不是就选另外一个 */
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }

    render(){
        let footer = {}  //const 不可变，let可变
        if(this.state.type=='detail'){
            footer = {    //这个footer只是层名字而已。 
                footer:null //里面这层footer才是真正在Table标签中起作用的
            }
        }
        
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },{
                title:'用户名',
                dataIndex:'username'
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){  //对渲染出来的数据这里进行统一处理，进行统一查询字典
                    return sex ==1?'男':'女'
                }
            },{
                title:'状态',
                dataIndex:'status',
                render(status){
                    return {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'zisu',
                        '5':'毕设',
                    }[status]  //按照索引返回里面的值
                }
            },{
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    return {
                        '1':'打篮球',
                        '2':'题注器',
                        '3':'爬山',
                        '4':'骑行',
                        '5':'做球',
                        '3':'爬山',
                        '4':'乒乓球',
                        '5':'麦霸',
                    }[interest]  //按照索引返回里面的值
                }
            },{
                title:'birthday',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
        ]
        return(<div>
            <Card title="用户查询">
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
            </Card>
            <Card style={{marginTop:10}} className="operate-wrap">
                <Button icon="plus" type="primary" onClick={()=>this.handleOperate('create')}>创建管理员</Button>
                <Button icon="edit" type="primary" id="user_edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                <Button icon="delete" type="primary" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
            </Card>
            <Card className="operate-wrap">               
                <CTable
                    columns={columns}
                    updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                    dataSource = {this.state.list}  //这里的this.state.list 和axios.requestList() 返回的值的互通的。
                    pagination = {this.state.pagination}   //要分页就必须设置后面的 的等于{this.state.pagination}  因为 分页后调用回调，回调把改变后的信息都放在这里。
                    selectedRowKeys = {this.state.selectedRowKeys}  //只要在<Table> 中写了selectedRowKeys，我们就能选中后通过selectedRowkeys 获取数据
                    rowSelection='checkbox'
                />
            </Card>
            
            <Modal
                title={this.state.title}
                visible={this.state.isVisible}
                onOk={this.handleSubmit}  //是点击模态框确定按钮出发的事件
                onCancel={()=>{
                    this.setState({isVisible:false})
                    //this.userForm.props.form.resetFields();  //是否保留页面信息当取消的时候。

                }}  //这里不需要返回值而是执行某些操作所以不需要 ()=>....
                width={600}
                {...footer} //把footer这个属性结构出来。
            >
                <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm = inst}></UserForm> 
                {/* wrappedComponentRef={(inst)=>this.Form = inst ，作用主要是吧Form存储到本地并且把它挂载到我们当前的作用域上去 */}
                {/* 把写好的表单空间填充到Modal里面 */}
            </Modal>             
        </div>)
    }
}

class UserForm extends React.Component{
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
                        (type == "detail")?userInfo.username:  //***注意这种写法是这样读取详情的 */
                        getFieldDecorator("username",{ 
                            initialValue:userInfo.username  //获取初始值
                        })( //第一个("1"，{2}) 第二个参数是默认参数 
                            <Input type="text" placeholder="请输入用户名"></Input>  //通过FieldDecorator 这种我们我们把所要监听的输入框绑定在一起，这样我们就能快速的获取里面的值
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == "detail"?(userInfo.sex==1?"男":"女"):
                        getFieldDecorator("sex",{ 
                            initialValue:userInfo.sex  //获取初始值
                        })( 
                            <RadioGroup>
                                <Radio value={1}>男</Radio> 
                                <Radio value={0}>女</Radio> 
                                {/* value={1}表示数字的1，value=“1”表示的是字符串的1 */}
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == "detail"?this.getState(userInfo.state):
                        getFieldDecorator("status",{ 
                            initialValue:userInfo.status  //获取初始值
                        })( 
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={1}>咸鱼二条</Option>
                                <Option value={1}>咸鱼三条</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == "detail"?userInfo.birthday:
                        getFieldDecorator("birthday",{ 
                            initialValue:moment(userInfo.birthday)  //获取初始值
                        })( 
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == "detail"?userInfo.address:
                        getFieldDecorator("address",{ 
                            initialValue:userInfo.address  //获取初始值
                        })( 
                            <TextArea row={3} placeholder="请输入联系地址"></TextArea>
                        )
                    }
                </FormItem>
            </Form>
        </div>)
    }
}
UserForm = Form.create({})(UserForm)  //通过Form.create 去生成这个表单
