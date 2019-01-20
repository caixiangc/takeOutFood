import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
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


export default class IRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/ui/buttons' component={Buttons}></Route>
                                <Route path='/admin/ui/modals' component={Modals}></Route>
                                <Route path='/admin/ui/loadings' component={Spin}></Route>
                                <Route path='/admin/ui/notification' component={Notifacition}></Route>
                                <Route path='/admin/ui/tabs' component={Tabs}></Route>
                                <Route path='/admin/form/login' component={FormLogin}></Route>
                                <Route path='/admin/form/reg' component={Register}></Route>
                                <Route path='/admin/table/basic' component={BasicTable}></Route>
                                <Route path='/admin/table/high' component={HighTable}></Route>
                                <Route path='/admin/city' component={City}></Route>
                                <Route path='/admin/order' component={Order}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                <Route path='/admin/charts/bar' component={Bar}></Route>
                                <Route path='/admin/charts/pie' component={Pie}></Route>
                                <Route path='/admin/charts/line' component={Line}></Route>
                                <Route path='/admin/rich' component={Rich}></Route>
                                <Route path='/admin/permission' component={Permission}></Route>


                                <Route component={NoMatch}></Route>
                            </Switch>   
                        </Admin>
                    }></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/detail" component={Admin}></Route>
                    <Route path="/common" render={ 
                        ()=>{
                            return <Common>  
                                <Route path="/common/order/detail/:orderId/:username" component={OrderDetail}></Route>
                            </Common>
                        }
                    }></Route>
                </App>
            </HashRouter>
        )
    }
}