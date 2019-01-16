import React from 'react'
import {HashRouter as Router,Link,Route,Switch} from 'react-router-dom'
import About from './../router-demo/about'
import Main from './main'
import Topic from './../router-demo/topic'
import Home from './Homea'
import Info from './info'
import NoMatch from './NoMatch'
export default class Routers extends React.Component{
    render(){
        return(
            <Router>
                <Home>
                    <Switch>
                    <Route path="/main" render={()=> //注意这里是直接返回 不要 render={()=>{.....}} ,不加{} 表示直接返回 ... 的内容
                        <Main>
                            <Route path="/main/:value" component={Info}></Route>
                        </Main>}>
                    </Route>
                    <Route path="/about" component={About}></Route>   
                    <Route path="/topic" component={Topic}></Route>
                    <Route component={NoMatch}></Route>
                    </Switch>
                </Home>
            </Router>
        )
    }
}