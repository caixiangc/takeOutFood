import React from 'react'
import {HashRouter as Router,Link,Route,Switch} from 'react-router-dom'

export default class Main extends React.Component{
    render(){
        return(
            <div>
                测试获取动态路由值为：
                {this.props.match.params.value}
            </div>
        )
    }
}