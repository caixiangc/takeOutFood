import React from 'react'
import {HashRouter as Router,Link,Route,Switch} from 'react-router-dom'
import About from './../router-demo/about'
import Main from './../router-demo/main'
import Topic from './../router-demo/topic'
import Home from './Homea'
export default class Routers extends React.Component{
    render(){
        return(
            <Router>
                <Home>
                    <Route path="/" render={()=> //注意这里是直接返回 不要 render={()=>{.....}} ,不加{} 表示直接返回 ... 的内容
                        <Main>
                            <Route path="/a" component={About}></Route>
                        </Main>}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topic" component={Topic}></Route>
                </Home>
            </Router>
        )
    }
}