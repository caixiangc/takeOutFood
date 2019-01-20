import React from 'react'
import {Card,Button, Tree,Form,Select,Modal,Input} from 'antd'
import CTable from './../../components/CTable/index'
import Utils from './../../utils/utils'
import axios from './../../axios/index'
import './../../style/common.less'
import menuConfig from './../../config/menuConfig'

const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const FormItem = Form.Item;
export default class PermissionUser extends React.Component{

    state={
        
    }
    componentWillMount(){
        axios.requestList(this,'/role/list',{})
    }
    handleCreateRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }
    handleRoleSubmit = ()=>{
        let data = this.RoleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'role/create',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isRoleVisible:false
                })
                this.RoleForm.props.form.resetFields();
                
                axios.requestList(this,'/role/list',{})
            }
        })
    }

    handlePermission = ()=>{     //在点击的时候就触发，把当前行的数据取过来放在detailInfo里面，为后续展示做准备。
        let item = this.state.selectedItem;   //selectedItem这个页面可能没有但是调用axios.requestList(this,'/role/list',{}) 会把selectedItem 这个数据set到这个this作用域上来。
        if(!item){
            return;
        }
        this.setState({
            isPerVisible:true,
            detailInfo:item,
            menuInfo:item.menus    
        })
    }
    
    render(){
        const {editorState} = this.state; //还是一样从state中结构出editorState出来
        const columns=[
            {
                title:"角色id",
                dataIndex:'user_id' 
            },{
                title:"角色名称",
                dataIndex:'user_name' 
            },{
                title:"创建时间",
                dataIndex:'create_time' 
            },{
                title:"使用状态",
                dataIndex:'status',
                render(status){
                    return status==1?'启用':'禁用'
                }
            },{
                title:"授权时间",
                dataIndex:'authorize_time' 
            },{
                title:"授权人",
                dataIndex:'authorize_username' 
            }
        ]
        return (<div>
            <Card title="权限授权" >
                <Button type="primary" onClick={this.handleCreateRole}>创建角色</Button>
                <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                <Button type="primary">用户授权</Button>

            </Card>
            <div className="content-wrap">
                <CTable
                    dataSource={this.state.list} //去list取值，必须先要在
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    //rowSelection='checkbox'
                    selectedRowKeys={this.state.selectedRowKeys}
                    columns={columns}   
                ></CTable>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.RoleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >  
                    {/* 注意Modal 定义在哪里都可以，但是wrappedComponentRef={}里面的数据必须返回 */}
                    <RoleForm wrappedComponentRef={(inst)=>this.RoleForm=inst}></RoleForm>  
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPerVisible}
                    onOk={this.handlePerEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPerVisible:false
                        })
                    }}
                >
                {/* react是单向流动的，必须有父组件流向子组件，子组件改变值后，再由子组件调用父组件的方法，再由父组件流向子组件。 */}
                    <PerEditForm 
                        detailInfo={this.state.detailInfo}
                        patchMenus = {(checkedKeys)=>{
                            setState({
                                menuInfo:checkedKeys
                            })
                        }}
                        menuInfo={this.state.menuInfo}
                    ></PerEditForm>
                </Modal>
            </div>
        </div>)
    }
}


class RoleForm extends React.Component{
    render(){
        const formItemLayout = {  
            labelCol:{span:5},
            wrapperCol:{span:19},
            
        }
        const {getFieldDecorator} = this.props.form; 
        return(<div>
            <Form layout="horizontal" >
                <FormItem label="权限名" {...formItemLayout}>
                    {
                        getFieldDecorator("userRolename")( 
                            <Input type="text" placeholder="请输入用户名"></Input>  //通过FieldDecorator 这种我们我们把所要监听的输入框绑定在一起，这样我们就能快速的获取里面的值
                        )
                    }
                </FormItem>
                
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("status")( 
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={1}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                
            </Form>
        </div>)
    }
}
RoleForm = Form.create({})(RoleForm)  //通过Form.create 去生成这个表单


class PerEditForm extends React.Component{

    onCheck = (checkedKeys)=>{  //onCheck 是antd内置的方法，会把点击过的整个参数获取到
        this.props.patchMenus(checkedKeys);
    }
    
    renderTreeNodes = (data)=>{
        //注意这里一定要把总的给return 不然这个递归到第一层就没了
        return data.map((item)=>{  //这个遍历主要有两点，一： data.map会遍历到‘这层’的每一个元素。二：在<TreeNode></TreeNode>内容里面写递归。
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)} 
                    {/* 千万注意这里不能把对象传进去，而是对象里面的children给传进去,,这里就相当于是左子树。其实就是深度antd的树形控件是按一个TreeNode 嵌套另外一个TreeNode来的 */}
                </TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key}/>
            }
        })
    }
    render(){
        const formItemLayout = {  
            labelCol:{span:5},
            wrapperCol:{span:19},
            
        }
        const detail_info = this.props.detailInfo; //注意这里不能this.state去取detailInfo因为这里的this是指这个form类的指针，并不是，上面那个主类的指针，
        const menu_info = this.props.menuInfo;
        const {getFieldDecorator} = this.props.form;  //getFieldDecorator是form对象的里面一个对象， 是通过解构出来的。
        return(<div>
            <Form layout="horizontal">
                <FormItem label="角色名" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.user_name}></Input>
                </FormItem>
                <FormItem label="角色名" {...formItemLayout}>
                    {
                        getFieldDecorator("status",{initialValue:'1'})(
                            <Select>
                                <Option value="1">启用</Option>
                                <Option value="2">停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Tree
                        checkable
                        defaultExpandAll
                        onCheck={(checkedKeys)=>{
                            this.onCheck(checkedKeys);
                        }}
                        checkedKeys={menu_info}
                    >
                        <TreeNode title="平台权限" key="platform_all" >
                            {this.renderTreeNodes(menuConfig)}
                        </TreeNode>
                    </Tree>
                </FormItem>
            </Form>
        </div>)
    }
}
PerEditForm = Form.create({})(PerEditForm)