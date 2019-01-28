import React from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import Admin from './admin'
import Login from './page/login/index'
import App from './App'
import Buttons from './page/ui/buttons'
import Home from './page/home/index'
import NoMatch from './page/noMatch/index'
import Modals from './page/ui/modals'
import Spin from './page/ui/loading'
import Notifacition from './page/ui/notification'
import Tabs from './page/ui/tabs'
import FormLogin from './page/ui/form'
import Register from './page/ui/registerForm'
import BasicTable from './page/ui/table/basictable'
import HighTable from './page/ui/table/highTable'
import City from './page/city/index'
import Order from './page/order/index'
import Common from './common'
import OrderDetail from './page/order/detail'
import User from './page/user/index'
import Bar from './page/echarts/bar/index'
import Pie from './page/echarts/pie/index'
import Line from './page/echarts/line/index'
import Rich from './page/rich/index'
import Permission from './page/permission/index'
import Shop from './shop/shopIndex'
import Payment from './shop/payment/index'


export default class IRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/shop" component={Shop}></Route>
                        <Route path="/payment/order/:orderId" component={Payment}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/detail" component={Admin}></Route>
                        <Route path="/common" render={ 
                            ()=>{
                                return <Common>  
                                    <Route path="/common/order/detail/:orderId/:username" component={OrderDetail}></Route>
                                </Common>
                            }
                        }></Route>
                        <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                {/* 当进入“/” 这个路由的时候，首先去重定向，也就是默认条撞到/home */}
                                <Route path='/home' component={Home}></Route>
                                <Route path='/ui/buttons' component={Buttons}></Route>
                                <Route path='/ui/modals' component={Modals}></Route>
                                <Route path='/ui/loadings' component={Spin}></Route>
                                <Route path='/ui/notification' component={Notifacition}></Route>
                                <Route path='/ui/tabs' component={Tabs}></Route>
                                <Route path='/form/login' component={FormLogin}></Route>
                                <Route path='/form/reg' component={Register}></Route>
                                <Route path='/table/basic' component={BasicTable}></Route>
                                <Route path='/table/high' component={HighTable}></Route>
                                <Route path='/city' component={City}></Route>
                                <Route path='/order' component={Order}></Route>
                                <Route path='/user' component={User}></Route>
                                <Route path='/charts/bar' component={Bar}></Route>
                                <Route path='/charts/pie' component={Pie}></Route>
                                <Route path='/charts/line' component={Line}></Route>
                                <Route path='/rich' component={Rich}></Route>
                                <Route path='/permission' component={Permission}></Route>
                                <Redirect to="/home"></Redirect> 

                                <Route component={NoMatch}></Route>
                            </Switch>   
                        </Admin>
                    }></Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}