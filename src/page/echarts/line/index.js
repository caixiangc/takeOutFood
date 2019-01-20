import React from 'react'
import {Card} from 'antd'

//按需加载 （echarts导入开始）
import charts from 'echarts/lib/echarts'   //先把核心类给导入进来
//导入柱形图,把所有关于bar的内容都导入进来
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'  //这个模块使我们可以使用组件化，而非new一个对象
import echartTheme from './../echartTheme';   //导入自定义主题
//按需加载 （echarts导入结束）


export default class Bar extends React.Component{
    
    
    componentWillMount(){  //一定要提前注入，否者都已经生成好了，就不会变了。 
        charts.registerTheme('takeOut',echartTheme); //把主题给注入 进echarts 名字为 takeout
        //这里的charts 是from 'echarts/lib/echarts'的核心库
    }
    getOption = ()=>{
        let option = {
            title:{   //title是个对象，并不是一个字符串，要写成 title="用户订单量"
                text:'用户订单量',
                x:"center"
            },
            legend:{
                orient:'vertical',
                right:10,
                top:10,
                bottom:50,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[   //这里的几个点必须和上面的xAxis的data相互对应。
                        1000,
                        1100,
                        900,
                        2000,
                        500,
                        1500,
                        200,
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title:{   //title是个对象，并不是一个字符串，要写成 title="用户订单量"
                text:'用户订单量2',
                x:"center"
            },
            legend:{
                orient:'vertical',
                right:10,
                top:10,
                bottom:50,
                data:['订单量1','订单量2']
            },
            tooltip:{
                trigger:'item',
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量1',
                    type:'line',
                    data:[   //这里的几个点必须和上面的xAxis的data相互对应。
                        1000,
                        1100,
                        900,
                        2000,
                        500,
                        1500,
                        200,
                    ]
                },
                {
                    name:'订单量2',
                    type:'line',
                    data:[   //这里的几个点必须和上面的xAxis的data相互对应。
                        699,
                        1400,
                        500,
                        250,
                        500,
                        700,
                        400,
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = ()=>{
        let option = {
            title:{   //title是个对象，并不是一个字符串，要写成 title="用户订单量"
                text:'用户订单量2',
                x:"center"
            },
            legend:{
                orient:'vertical',
                right:10,
                top:10,
                bottom:50,
                data:['订单量1','订单量2']
            },
            tooltip:{
                trigger:'item',
            },
            xAxis:{
                type: 'category',
                boundaryGap: false,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量1',
                    type:'line',
                    data:[   //这里的几个点必须和上面的xAxis的data相互对应。
                        1000,
                        1100,
                        900,
                        2000,
                        500,
                        1500,
                        200,
                    ],        
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render(){
        return (<div>
            <Card title="折现图表之一" >
                <ReactEcharts option={this.getOption()} theme='takeOut' style={{height:500}} />  
                {/* theme='takeout'这里的主题一定要上面注册过才能用 */}
            </Card>
            <Card title="折现图表之二" style={{marginTop:10}}>
                <ReactEcharts option={this.getOption2()} theme='takeOut' style={{height:500}} />  
            </Card>
            <Card title="折现图表之三" style={{marginTop:10}}>
                <ReactEcharts option={this.getOption3()} theme='takeOut' style={{height:500}} />  
            </Card>
        </div>)
    }
} 