import React from 'react'
import {Card} from 'antd'

//按需加载 （echarts导入开始）
import charts from 'echarts/lib/echarts'   //先把核心类给导入进来
//导入柱形图,把所有关于bar的内容都导入进来
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'  //这个模块使我们可以使用组件化，而非new一个对象
import echartTheme from './../themeLight';   //导入自定义主题
//按需加载 （echarts导入结束）


export default class Pie extends React.Component{
    
    
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
                formatter:'{a}<br/>{b}:{c}({d}%)'  // 看文档 tooltip.formatter 
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:1200,
                            name:'周一'
                        },
                        {
                            value:2000,
                            name:'周二'
                        },
                        {
                            value:600,
                            name:'周三'
                        },
                        {
                            value:1500,
                            name:'周四'
                        },

                        {
                            value:3000,
                            name:'周五'
                        },
                        {
                            value:1000,
                            name:'周六'
                        },
                        {
                            value:1000,
                            name:'周日'
                        },
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = ()=>{
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
                formatter:'{a}<br/>{b}:{c}({d}%)'  // 看文档 tooltip.formatter 
            },
            series:[
                {
                    name:'订单量',
                    radius:['50%','80%'],
                    type:'pie',
                    center:['50%','60%'],
                    data:[
                        {
                            value:1200,
                            name:'周一'
                        },
                        {
                            value:2000,
                            name:'周二'
                        },
                        {
                            value:600,
                            name:'周三'
                        },
                        {
                            value:1500,
                            name:'周四'
                        },

                        {
                            value:3000,
                            name:'周五'
                        },
                        {
                            value:1000,
                            name:'周六'
                        },
                        {
                            value:1000,
                            name:'周日'
                        },
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = ()=>{
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
                formatter:'{a}<br/>{b}:{c}({d}%)'  // 看文档 tooltip.formatter 
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    center:['50%','60%'],
                    data:[
                        {
                            value:1200,
                            name:'周一'
                        },
                        {
                            value:2000,
                            name:'周二'
                        },
                        {
                            value:600,
                            name:'周三'
                        },
                        {
                            value:1500,
                            name:'周四'
                        },

                        {
                            value:3000,
                            name:'周五'
                        },
                        {
                            value:1000,
                            name:'周六'
                        },
                        {
                            value:1000,
                            name:'周日'
                        },
                    ].sort((a,b)=>{ //sort是js提供的方法是操作一个对象的，a代表的是每个对象。
                        return a.value-b.value; //通过>0 还是<0 来判断是升序还是降序。
                    }),
                    roseType:'radius', //南丁格尔图数据越大 半径越大
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    render(){
        return (<div>
            <Card title="饼图表之一" >
                <ReactEcharts option={this.getOption()} theme='takeOut' style={{height:500}} />  
                {/* theme='takeout'这里的主题一定要上面注册过才能用 */}
            </Card>
            <Card title="饼图表之二" style={{marginTop:10}}>
                <ReactEcharts option={this.getOption2()} theme='takeOut' style={{height:500}} />  
            </Card>
            <Card title="饼图表之三" style={{marginTop:10}}>
                <ReactEcharts option={this.getOption3()} theme='takeOut' style={{height:500}} />  
            </Card>
        </div>)
    }
} 