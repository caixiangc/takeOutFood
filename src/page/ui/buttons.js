import React from 'react'
import {Card,Button,Radio} from 'antd'
import './common.less'
export default class Buttons extends React.Component{
    state = {
        loading:true,
        size:'default'
    }
    handleCloseLoading = ()=>{
        this.setState({
            loading:false
        })
    }
    handleOpenLoading = ()=>{
        this.setState({
            loading:true
        })
    }
    handleChange=(e)=>{
        console.log(e.target.value);
        this.setState({
            size : e.target.value
        })
    }

    render(){
        return(
            <div>
                <Card title="基础按钮">
                    <Button type="primary">primary</Button>
                    <Button type="dashed">dashed</Button>
                    <Button type="danger">danger</Button>
                    <Button>normal</Button>
                </Card>
                <Card title="图形按钮">
                    <Button type="primary" icon="plus">添加</Button>
                    <Button type="danger" icon="delete">删除</Button>
                    <Button icon="edit">编辑</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="loading图形按钮">
                    <Button type="primary" icon="plus" loading={this.state.loading}>添加</Button>
                    <Button type="danger" icon="delete" loading={this.state.loading}>删除</Button>
                    <Button shape="circle" loading={this.state.loading} type="primary"></Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                    <Button type="primary" onClick={this.handleOpenLoading}>开启</Button>
                </Card>
                <Card title="按钮尺寸">
                    <Radio.Group size={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>按钮1</Button>
                    <Button type="primary" size={this.state.size}>按钮2</Button>
                </Card>
            </div>
        )
    }
}