import React from 'react'
import {HashRouter,Link,Route,Switch} from 'react-router-dom'
import About from './about'
import Main from './main'
import Topic from './topic'
export default class Demo extends React.Component{
    render(){
        return(
            <HashRouter>
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
                    <Switch>
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topic" component={Topic}></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}