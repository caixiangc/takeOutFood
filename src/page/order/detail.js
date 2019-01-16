import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import moment from 'moment';
import './detail.less'


const FormItem = Form.Item
const {RangePicker} = DatePicker;
export default class Order extends React.Component{
    state={
    }
    componentDidMount(){
        let orderId = this.props.match.params.orderId;//所有数据都是通过this.props去取，然后通过match.params去匹配一个叫orderId的东西
        let username = this.props.match.params.username;//所有数据都是通过this.props去取，然后通过match.params去匹配一个叫orderId的东西

        console.log(orderId);
        console.log(this.props.match)
        if(orderId){ 
            this.getDetailInfo(orderId);
        }        

    }
    getDetailInfo = (orderId,username)=>{
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId:orderId,  //后面的orderId 是方法参数传进来的orderId
                    username:username
                    //params注意这种写法，:path: "/common/order/detail/:orderId", url: "/common/order/detail/2959165"
                    //注意/common/order/detail/:orderId  后面的参数是写在route表里面的、
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap();

                //定位开始

                // //定位开始 //to-do 到时候依据这个创建用户的时候直接定位
                // var localSearch = new window.BMap.LocalSearch(this.map);
                // var poi;
                // var keyword = "浙江省建德市寿昌镇小卜家蓬村";
                // localSearch.setSearchCompleteCallback(function (searchResult) {
                //     poi = searchResult.getPoi(0);
                //     console.log(poi.point.lng + "," + poi.point.lat)
                // });   
                // localSearch.search(keyword);
                // console.log(localSearch)
                // //定位结束
                Utils.getLocation();
            }
        })
    }

    

    renderMap = ()=>{
        this.map = new window.BMap.Map('orderDetailMap',{enableMapClick:false}); //把百度地图这个map挂载到我们作用域上去
        this.map.centerAndZoom(new BMap.Point(120.16037,30.30877), 11);    
        this.addMapControl();

        //map logical begin

        this.myP1 = new window.BMap.Point(120.138521,30.318215);    //起点
        this.myP2 = new window.BMap.Point(120.16037,30.30877);    //终点
        this.myIcon = new window.BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
            //offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new window.BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var driving2 = new window.BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});    //驾车实例
        driving2.search(this.myP1, this.myP2);    //显示一条公交线路

        
        
        setTimeout(this.run(),1500);
        //var location =  Utils.getLocation();
        
    //map logical end
    }

    //map-run
    run = ()=>{
        var _this = this;  //
        var driving = new window.BMap.DrivingRoute(this.map);    //驾车实例
        driving.search(this.myP1, this.myP2);
        driving.setSearchCompleteCallback(function(){
            var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
            var paths = pts.length;    //获得有几个点

            var carMk = new window.BMap.Marker(pts[0],{icon:_this.myIcon});
            _this.map.addOverlay(carMk);
            var i=0;
            function resetMkPoint(i){
                carMk.setPosition(pts[i]);
                if(i < paths){
                    setTimeout(function(){
                        i++;
                        resetMkPoint(i);
                    },100);
                }
            }
            setTimeout(function(){
                resetMkPoint(5);
            },100)

        });
    }


    


    
    //添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT}));    
        map.addControl(new window.BMap.ScaleControl());   
    }


    



    render(){
        const info = this.state.orderInfo || {}; //如果orderInfo 是一个空值的话，那么就给一个{}

        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                            <div className="item-title">基础信息</div>
                            <ul>
                                <li>
                                    <div className="detail-form-left">用车模式</div>
                                    <div className="detail-form-content">{info.mode==1?'服务区':'停车点'}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">订单编号</div>
                                    <div className="detail-form-content">{info.order_sn}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">车辆编号</div>
                                    <div className="detail-form-content">{info.bike_sn}</div>

                                </li>
                                <li>
                                    <div className="detail-form-left">用户姓名</div>
                                    <div className="detail-form-content">{info.user_name}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">手机号码</div>
                                    <div className="detail-form-content">{info.mobile}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="detail-items">
                            <div className="item-title">行驶轨迹</div>
                            <ul>
                                <li>
                                    <div className="detail-form-left">行程起点</div>
                                    <div className="detail-form-content">{info.start_location}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">行程终点</div>
                                    <div className="detail-form-content">{info.end_location}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">行驶里程</div>
                                    <div className="detail-form-content">{info.distance/1000}公里</div>

                                </li>
                                <li>
                                    <div className="detail-form-left">用户姓名</div>
                                    <div className="detail-form-content">{info.user_name}</div>
                                </li>
                                <li>
                                    <div className="detail-form-left">手机号码</div>
                                    <div className="detail-form-content">{info.mobile}</div>
                                </li>
                            </ul>
                    </div>    
                    
                </Card>
            </div>
        )
    }
}