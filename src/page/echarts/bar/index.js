import React from 'react'
import {Card} from 'antd'

//按需加载 （echarts导入开始）
import charts from 'echarts/lib/echarts'   //先把核心类给导入进来
//导入柱形图,把所有关于bar的内容都导入进来
import 'echarts/lib/chart/bar'
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
            title:{
                text:'连锁店订单'
            },
            tooltip:{
                trigger:'axis'  //当鼠标移上去显示x轴的信息，也会显示series的name
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日',] //这里到时候从后台那里来加载数据，形式都是一样的。
            },
            yAxis:{
                type:'value'
            },
            series:[  //series 其实是一个数组，一个数组代表着一条数据，多个数据代表多条。
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,2000,3000,2000,5000,3000,900]  //到时候定义一个ajax 数据往这里传输。
                }
            ]
        }
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title:{
                text:'连锁店订单对比图'
            },
            legend:{
                data:['连锁店1','连锁店2','连锁店3']
            },
            tooltip:{
                trigger:'axis'  //当鼠标移上去显示x轴的信息，也会显示series的name
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日',] //这里到时候从后台那里来加载数据，形式都是一样的。
            },
            yAxis:{
                type:'value'
            },
            series:[  //series（是个数据源） 其实是一个数组，一个数组代表着一条数据，多个数据代表多条。
                {
                    name:'连锁店1',
                    type:'bar',
                    data:[2000,1000,3000,5000,900,3000,5000]
                },
                {
                    name:'连锁店2',
                    type:'bar',
                    data:[1000,2000,3000,2000,5000,3000,900]
                },
                {
                    name:'连锁店3',
                    type:'bar',
                    data:[300,4000,6000,10000,6000,3000,1200]
                }
            ]
        }
        return option;
    }

    render(){
        return (<div>
            <Card title="图表之一" >
                <ReactEcharts option={this.getOption()} theme='takeOut' style={{height:500}} />  
                {/* theme='takeout'这里的主题一定要上面注册过才能用 */}
            </Card>
            <Card title="图表之二" style={{marginTop:10}}>
                <ReactEcharts option={this.getOption2()} theme='takeOut' style={{height:500}} />  
            </Card>
        </div>)
    }
} 