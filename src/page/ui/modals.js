import React from 'react'
import {Card,Button,Radio,Modal,message} from 'antd'
import './common.less'
export default class Modals extends React.Component{

    state={
        showModel1:false,
        showModel2:false,
        showModel3:false,
        showModel4:false
    }
    handleOpen = (type)=>{
        this.setState({
            [type]:true
        })
    }
    handleConfirm = (type)=>{
        //Modal.confirm({})
        //Modal['confirm']()

        Modal[type](
            {
                title : "你确定点这个吗",
                content	: "你确定点这个吗",
                onOk(){
                    console.log("I am Sure!!")
                },
                onCancel(){
                    console.log("I want quit!!")
                }
            }
        )
    }

    //Message提示框
    //其实onClose 直接就是一个函数，它和onClick={函数} 不太一样
    messageClose = (type) => {
        console.log("messageClose-close:"+type);
    }
    handleMessage = (type)=>{
        console.log(type);
        message[type]("this is a functions:"+type,2,this.messageClose(type));
    }

    render(){
        return(
            <div>
                <Card title="基础模态框" className="card-warp">
                    <Button type="primary" onClick={()=>this.handleOpen('showModel1')}>Open</Button>
                    <Button type="dashed" onClick={()=>this.handleOpen('showModel2')}>自定义页脚</Button>
                    <Button type="danger" onClick={()=>this.handleOpen('showModel3')}>顶部20px弹框</Button>
                    <Button onClick={()=>this.handleOpen('showModel4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认" className="card-warp">
                    <Button type="default" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="dashed" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button onClick={()=>this.handleConfirm('warning')}>Warming</Button>
                </Card>

                <Card title="Message提示" className="card-warp">
                    <Button type="primary" onClick={()=>this.handleMessage('info')}>Display normal message</Button>               
                    <Button onClick={()=>this.handleMessage('success')}>Success</Button>
                    <Button onClick={()=>this.handleMessage('error')}>Error</Button>
                    <Button onClick={()=>this.handleMessage('warning')}>Warning</Button>
                </Card>


                <Modal
                title="Basic Modal（Open）"
                visible={this.state.showModel1}
                onCancel={()=>{this.setState({showModel1:false})}}
                >
                    <p>欢迎来到外卖点餐系统</p>
                </Modal>

                <Modal
                title="Basic Modal（自定义页脚）"
                visible={this.state.showModel2}
                okText={"好的"}
                cancelText={"算了"}
                onCancel={()=>{this.setState({showModel2:false})}}
                >
                <p>欢迎来到外卖点餐系统</p>
                </Modal>

                <Modal
                title="Basic Modal（顶部20px弹框）"
                style={{top:20}}
                visible={this.state.showModel3}
                okText={"好的"}
                cancelText={"算了"}
                onCancel={()=>{this.setState({showModel3:false})}}
                >
                <p>欢迎来到外卖点餐系统</p>
                </Modal>

                <Modal
                title="Basic Modal（水平垂直居中）"
                wrapClassName="vertical-center-modal"
                visible={this.state.showModel4}
                okText={"好的"}
                cancelText={"算了"}
                onCancel={()=>{this.setState({showModel4:false})}}
                >
                <p>欢迎来到外卖点餐系统</p>
                </Modal>
            </div>
        )
    }
}