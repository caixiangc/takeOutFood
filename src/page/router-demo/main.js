import React from 'react'
import {HashRouter as Router,Link,Route,Switch} from 'react-router-dom'

export default class Main extends React.Component{
    render(){
        return(
            <div>
                this is a main
                <Link to="/a">嵌套路由</Link>
                <hr></hr>
                {this.props.children}
            </div>
        )
    }
}