import React from 'react'
import 'antd/dist/antd.css'
import {Button, Col,Row} from 'antd'
import './index.less'
import Utils from './../../utils/utils'
import Axios from './../../axios/index'

export default class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            userName:"蔡翔"
        })
        setInterval(()=>{
            let currentTime = Utils.formateDate(new Date().getTime());
            this.setState({
                currentTime
            })
        },1000)
        //this.getWeatherFAPI();
    }
    //天气 api：http://v.juhe.cn/weather/index?format=2&cityname=%E6%9D%AD%E5%B7%9E&key=f26ea2117888798264f46c4a2fcab8db
    getWeatherFAPI(){
        let city = '杭州';
        Axios.jsonp({
            url:'http://v.juhe.cn/weather/index?format=2&cityname='+encodeURIComponent(city)+'&key=f26ea2117888798264f46c4a2fcab8db'
        }).then((res)=>{ // 这里要.then() 那么 Axios.jsonp()必须要return一个Promise
            if(res.resultcode=='200'){
                let today = res.result.today;
                this.setState({
                    temperature:today.temperature,
                    weather:today.weather
                })
            }
        })
    }
    render(){ 
        let menuType = this.props.menuType; 
        return(
            <div className="header">
                <Row className="header-top" >
                    {
                        menuType?<Col span={6} className="logos">
                            <img src="/assets/logo-ant.svg"></img>
                            <span>takeOut MS</span>
                        </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span >欢迎:{this.state.userName}</span>
                        <a href="#" style={{color:'white'}}>退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':<Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-detail">
                        首页
                    </Col>

                    <Col span={20} className="weather">
                        <span className="data">{this.state.currentTime}</span>
                        <span className="weather-detail">{this.state.temperature}-{this.state.weather}</span>
                    </Col>
                </Row>
                }
                
            </div>
        )
    }
}