import React from 'react'
import {Pagination, Table,Card, Modal,message} from 'antd'
import axios from '../../../axios/index'
import Utils from '../../../utils/utils'
export default class BasicForm extends React.Component{
    
    componentDidMount(){

        this.request(); //调用一下，不然不会执行
    }
    state={
        datas:[],
    }

    params={
        page:1
    }

    request = ()=>{
        let _this = this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                }
                //isShowloading:false   //这个data里面的两个参数，如果还需要可以继续往下加
            },
            methods:'get',
            isMock:true
            
        }).then((res)=>{ //这里then 说明前面分装方法 返回的是一个promise
            if(res.code==0){
                
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2: res.result.list,
                    dataSource: res.result.list, //在我们写好的util方法中 pagination(data,callback){}
                    pagination:Utils.pagination(res,(current)=>{
                        //to-do   //current 就是代表当前的页面号
                        _this.params.page = current; 
                        this.request();
                    }),
                    dataSource3: res.result.list,
                })
            }
        })
    }

    render(){
        
        const columns=[
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){ //注意这个的status参数必须是是从 dataIndex:'status' 的status过来的,可以是其他也可以是aa bb 都可以
                    let config={   
                        0:'男',
                        1:'女'
                    }
                    return config[sex];
                }
            },
            {
                title:'状态',
                dataIndex:'status', //表明dataIndex:'status' 从dataIndex里面得到的数据是往status这个字段里面填充的。 
                render(status){ //注意这个的status参数必须是是从 dataIndex:'status' 的status过来的,可以是其他也可以是aa bb 都可以
                    let config={   
                        1:'咸鱼一条',
                        2:'北大才子',
                        3:'风华浪子'
                    }
                    return config[status];
                }
            },
            {
                title:'兴趣',
                dataIndex:'interest',
                render(abc){ 
                    let config={   
                        1:'游泳',
                        2:'打篮球',
                        3:'打游戏',
                        4:'写作业',
                        5:'打乒乓球',
                    }
                    return config[abc];
                }
            },
            {
                title:'地址',
                dataIndex:'address'
            },
        ]

        //因为我们前面已经通过setState({selectedRowKeys:[index]}) 已经存下来了，所以现在我们要把它解构出来。

        //const selectedRowKeys= this.state.selectedRowKeys 这种写法和上面的一样

        const rowSelection ={
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                let ids = [];
                selectedRows.map((item)=>{ids.push(item.id)});

                Modal.confirm({  //selectedRowKeys,它是个数组类型的，直接获取到了 key，多选就多个。
                                 // selectedRows：也获取到了多个对象
                    title:"删除提示",
                    //content:`你确定要删除这些方法吗？${ids.join('、')}`,
                    content:`你确定要删除这些方法吗？${selectedRowKeys.join(',')}`,
                    onOk:()=>{
                        message.success("删除成功");
                        //调用接口 axios()
                        this.request(); //这个request是去 重新获取 所有数据 /allList
                    }
                })
            },
            onSelect: (record, selected, selectedRows) => {
                //console.log(record, selected, selectedRows);
                
              },
              onSelectAll: (selected, selectedRows, changeRows) => { //onselectAll 的时候会单独调用这个 其他两个就不调用了
                console.log(selected, selectedRows, changeRows);
              },
        }
        

        return(
            <div>
                <Card title="基础表格">
                    <Table
                        columns={columns} 
                        dataSource={this.state.dataSource}
                    >
                
                    </Table>
                </Card>
                <Card title="动态数据渲染表格" style={{marginTop:10}}>
                    <Table
                        columns={columns} 
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                        //loading:{true}  直接加loading 他会帮你全套解决，不用你自己去控制开关
                    >
                
                    </Table>
                </Card>

                <Card title="Mock-分页" style={{marginTop:10}}>
                    <Table
                        columns={columns} 
                        dataSource={this.state.dataSource3}
                        rowSelection={rowSelection}
                        //loading:{true}  直接加loading 他会帮你全套解决，不用你自己去控制开关
                        pagination = {this.state.pagination}   //pagination=「。。。」 这个pagination并不是内置属性而是我们写的一个集合。
                    >
                
                    </Table>
                </Card>
                
            </div>
            
        
        )
    }
}