import React from 'react'
import {Card,Button,Modal,Form, Input,Radio,DatePicker, Select} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import CTable from './../../components/CTable/index'
import BaseForm from './../../components/BaseForm/index'

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
        if(type == 'create'){
            this.setState({
                title:'创建员工',
                isVisible:true,
                type
            })
        }
    }

    handleSubmit = ()=>{

    }
    render(){
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
                render(sex){
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
                <Button icon="edit" type="primary" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
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
                    //selectedIds = {this.IdList}
                    //rowSelection = {false}
                    rowSelection='checkbox'
                />
            </Card>
            <Modal
                title={this.state.title}
                visible={this.state.isVisible}
                onOk={this.handleSubmit}  //是点击模态框确定按钮出发的事件
                onCancel={()=>{this.setState({isVisible:false})}}  //这里不需要返回值而是执行某些操作所以不需要 ()=>....
                width={600}
            >
                <UserForm type={this.state.type} wrappedComponentRef={(inst)=>this.Form = inst}></UserForm> 
                {/* wrappedComponentRef={(inst)=>this.Form = inst ，作用主要是吧Form存储到本地并且把它挂载到我们当前的作用域上去 */}
                {/* 把写好的表单空间填充到Modal里面 */}
            </Modal>             
        </div>)
    }
}

class UserForm extends React.Component{
    render(){
        const formItemLayout = {  //
            labelCol:{span:5},
            wrapperCol:{span:19},
            
        }
        const {getFieldDecorator} = this.props.form; 
        return(<div>
            <Form layout="horizontal" >
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator("username")( //第一个("1"，{2}) 第二个参数是默认参数 
                            <Input type="text" placeholder="请输入用户名"></Input>  //通过FieldDecorator 这种我们我们把所要监听的输入框绑定在一起，这样我们就能快速的获取里面的值
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator("sex")( 
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
                        getFieldDecorator("status")( 
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
                        getFieldDecorator("birthday")( 
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        getFieldDecorator("address")( 
                            <TextArea row={3} placeholder="请输入联系地址"></TextArea>
                        )
                    }
                </FormItem>
            </Form>
        </div>)
    }
}
UserForm = Form.create({})(UserForm)  //通过Form.create 去生成这个表单