import React from 'react'
import {HashRouter,Link,Route,Switch} from 'react-router-dom'
import About from './../router-demo/about'
import Main from './../router-demo/main'
import Topic from './../router-demo/topic'
export default class Homea extends React.Component{
    render(){
        return(
                <div>
                    <ul>
                        <li>
                            <Link to="/">main</Link>
                        </li>
                        <li>
                            <Link to="/about">about</Link>
                        </li>
                        <li>
                            <Link to="/topic">topic</Link>
                        </li>
                    </ul>
                    <hr></hr>
                    {this.props.children}
                </div>
        )
    }
}