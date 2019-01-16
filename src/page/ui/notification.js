import React from 'react'
import {Button,Icon,Spin,Alert,Card,notification} from 'antd'
import './common.less'
export default class Notification extends React.Component{
    
    handleNotification = (type,direction)=>{
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:"有人给你留言了。",
            description:"...给你的菜品留言了，关于....."
        })
    }
    
    render(){
        return(
            <div>
                <Card title="Notification 用法">
                    <Button type="primary" onClick={()=>this.handleNotification('success')}>success</Button>
                    <Button type="default" onClick={()=>this.handleNotification('info')}>info</Button>
                    <Button type="dashed" onClick={()=>this.handleNotification('warning')}>warning</Button>
                    <Button type="danger" onClick={()=>this.handleNotification('error')}>error</Button>
                </Card>

                <Card title="Notification 用法(方位)">
                    <Button type="primary" onClick={()=>this.handleNotification('success','topLeft')}>success</Button>
                    <Button type="default" onClick={()=>this.handleNotification('info','topRight')}>info</Button>
                    <Button type="dashed" onClick={()=>this.handleNotification('warning','bottomLeft')}>warning</Button>
                    <Button type="danger" onClick={()=>this.handleNotification('error','bottomLeft bottomRight')}>error</Button>
                </Card>

            </div>
        );
    }
}