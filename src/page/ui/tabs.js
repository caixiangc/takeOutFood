import React from 'react'
import {Button,Icon,Tabs,message,Card,notification} from 'antd'
import './common.less'
const TabPane = Tabs.TabPane;
export default class Notification extends React.Component{
    

    callback(key) {
        message.info("hi 你点击的标签是"+key)//当我们切换tab的时候，传的参数会自动去加载写在TabPane里的key
    }
    render(){
        return(
            <div>
                <Card title="Tabs 用法">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card>
                <Tabs defaultActiveKey="2" title="Tabs 用法(带图标)">
                    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1"> 
                    Tab 1
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                    Tab 2
                    </TabPane>
                </Tabs>
                </Card>


            </div>
        );
    }
}