import React from 'react'
import {Button,Icon,Spin,Alert,Card,Switch} from 'antd'
import './common.less'
export default class Loading extends React.Component{
    state={
        loading:false
    }
    toggle = (value) => {
        this.setState({ loading: value });
    }
    render(){
        const icon = <Icon type="loading" style={{fontSize:24}}></Icon>
        return(
            <div>
                <Card title="Spin 用法">
                    <Spin size="small"/>
                    <Spin size="default" style={{margin:'0 10px'}}/>
                    <Spin size="large"/>

                    <Spin size="large" indicator={icon} style={{margin:'0 10px'}}/>
                </Card>

                <Card title="内容遮罩">
                    <Spin size="large" tip="加载中..." spinning={this.state.loading}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>    
                    <div style={{ marginTop: 16 }}>
                        Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
                    </div>
                </Card>
            </div>
        );
    }
}