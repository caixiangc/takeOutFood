import React from 'react'
import axioss from 'axios'
import {Pagination, Table,Card, Modal,message,Badge,Button} from 'antd'
import axios from '../../../axios/index'
import Utils from '../../../utils/utils'

export default class HighTable extends React.Component{
    componentDidMount(){

        this.request(); //调用一下，不然不会执行
        this.request2();
    }
    state={

    }
    params={
        page:1
    };
    request = ()=>{
        let _this = this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                }
                //isShowloading:false   //这个data里面的两个参数，如果还需要可以继续往下加
            }
        }).then((res)=>{ //这里then 说明前面分装方法 返回的是一个promise
            if(res.code==0){
                
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2: res.result.list,
                    dataSource: res.result.list, //在我们写好的util方法中 pagination(data,callback){}
                    
                    dataSource3: res.result.list,
                })
            }
        })
    }
    request2 = ()=>{
        let _this = this;
        axios.ajax({
            url:'/table/high/list',
            data:{
                params:{
                    page:this.params.page
                }
                //isShowloading:false   //这个data里面的两个参数，如果还需要可以继续往下加
            }
        }).then((res)=>{ //这里then 说明前面分装方法 返回的是一个promise
            if(res.code==0){
                
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    pagination:Utils.pagination(res,(current)=>{
                        //to-do   //current 就是代表当前的页面号
                        _this.params.page = current; 
                        this.request();
                    }),
                    dataSource4: res.result.list,
                })
            }
        })
    }

    handleDelete = (item)=>{
        let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'你确定要删除此条数据吗',
            onOk:()=>{ //注意这里onOK 是一个函数
                //调用后台接口 axios(delete);
                message.success('删除成功');
                this.request2();

            }
        })
    }

    handlerSort = (pagination, filters, sorter)=>{ //注意这里必须同时放进去三个参数，才能取到sorter这个对象。否者sorter为空
        this.setState({
            sortOrder:sorter.order
        })
    }

    //test begin
    requestToken = ()=>{
        let _this = this;
        


        axioss.get('https://www.easy-mock.com/mock/5c2e0ba7c8123b4eccf80408/mockapi/token')
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            console.log("get a new Token:"+response.data.token)

        })
        .catch(function (error) {
            console.log(error);
        });

    }

    //test over
    handleTestClick=()=>{
        this.requestToken();
    }
    render(){
        const columns=[
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'username',
                width:80
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,
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
                width:80,
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
                width:80,
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
                dataIndex:'address',
                width:80
            },
        ]
        const columns2=[
            {
                title:'id',
                dataIndex:'id',
                width:80,

            },
            {
                title:'用户名',
                dataIndex:'username',
                width:80
            },
            {
                title:'id',
                dataIndex:'id',
                width:80
            },
            {
                title:'用户名',
                dataIndex:'username',
                width:80,
                fixed:'left'
            },
            {
                title:'id',
                dataIndex:'id',
                width:80,
                fixed:'right'
            },
            {
                title:'用户名',
                dataIndex:'username',
                width:80
            },
            {
                title:'性别',
                dataIndex:'sex',
                width:80,
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
                width:80,
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
                width:80,
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
                dataIndex:'address',
                width:80
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
            {
                title:'地址',
                dataIndex:'address',
                width:80
            },
        ]
        const columns3=[
            {
                title:'id',
                dataIndex:'id',
            },
            {
                title:'用户名',
                dataIndex:'username',
            },
            {
                title:'年龄',
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age;
                },
                sortOrder:this.state.sortOrder
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
                dataIndex:'address',
            },
        ]
        const columns4=[
            {
                title:'id',
                dataIndex:'id',
            },
            {
                title:'用户名',
                dataIndex:'username',
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
                        1:<Badge status="success" text="游泳" />,
                        2:<Badge status="error" text="打篮球" />,
                        3:<Badge status="default" text="打游戏" />,
                        4:<Badge status="processing" text="写作业" />,
                        5:<Badge status="warning" text="打乒乓球" />,
                    }
                    return config[abc];
                }
            },
            {
                title:'地址',
                dataIndex:'address',
            },
            {
                title : '操作', //注意return 格式；； render:(a,b)=>{...}
                render:(text,item)=>{ //要注意第一个参数是text，第二个参数是item，这个歌item是一整行数据。但是这里的text是空的。因为我们这列
                    return <Button size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>;//如果要传参那么一定写成箭头函数的形式，不要直接es5语法不然会出错，也要注意()=>function() 不加大括号是直接返回内容的。
                    //注意这里onClick里面的函数 必须加大括号，因为这里目的是执行里面的方法而不是返回里面方法的值。
                }
            }
        ]
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

        


        return (
            <div>
                <Card title="头部固定" style={{marginTop:10}}>
                    <Table
                        columns={columns} 
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                        //loading:{true}  直接加loading 他会帮你全套解决，不用你自己去控制开关
                        pagination = {false}
                    >
                
                    </Table>
                </Card>

                <Card title="左侧固定" style={{marginTop:10}}>
                    <Table
                        columns={columns2} 
                        dataSource={this.state.dataSource3}
                        rowSelection={rowSelection}
                        //loading:{true}  直接加loading 他会帮你全套解决，不用你自己去控制开关
                        pagination = {false}   //pagination=「。。。」 这个pagination并不是内置属性而是我们写的一个集合。
                        scroll={{ x: 1250 }}
                    >
                
                    </Table>
                </Card>

                <Card title="表格排序" style={{marginTop:10}}>
                    <Table
                        columns={columns3} 
                        dataSource={this.state.dataSource4}
                        rowSelection={rowSelection}
                        //loading:{true}  直接加loading 他会帮你全套解决，不用你自己去控制开关
                        pagination = {this.state.pagination}   //pagination=「。。。」 这个pagination并不是内置属性而是我们写的一个集合。
                        sorter
                        onChange={this.handlerSort}

                    >
                
                    </Table>
                </Card>

                <Card title="badge" style={{marginTop:10}}>
                    <Table
                        columns={columns4} 
                        dataSource={this.state.dataSource4}
                        rowSelection={rowSelection}
                        //loading:{true}  直接加loading 他会帮你全套解决，不用你自己去控制开关
                        pagination = {this.state.pagination}   //pagination=「。。。」 这个pagination并不是内置属性而是我们写的一个集合。
                        sorter
                        onChange={this.handlerSort}

                    >
                
                    </Table>
                </Card>
            
                <Button onClick={this.handleTestClick}>anniu</Button>
            </div>
        )
    }
}