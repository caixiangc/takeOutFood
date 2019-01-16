import React from 'react'
import {HashRouter as Router,Link,Route,Switch} from 'react-router-dom'

export default class Main extends React.Component{
    render(){
        return(
            <div>
                this is a main
                <br></br>
                <Link to="/main/abc">嵌套路由1</Link>
                <hr></hr>
                <Link to="/main/456">嵌套路由2</Link>
                <br></br>
                {this.props.children}
            </div>
        )
    }
}