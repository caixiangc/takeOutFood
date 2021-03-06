import React from 'react'
import {Select} from 'antd'
const Option = Select.Option;


export default{
    
    formateDate(date){ //注意这里就是date 不可以交换顺序
        if(!date)return '';
        let time = new Date(date); //会把传进来的值格式化。时间戳==》转成标准日期类型
        return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
    },

    pagination(data,callback){ //data 当前第几页一共有几条数据,,当点击下一页的时候出发 callback去回调
        let page = { //这里的callback 就是外面的那一串回调函数，， callback(page);就相当于会调用外面的那一大串东西，onChange是时刻监听的
            onChange:(page)=>{
                console.log("当前页码："+page);
                callback(page); //发起一个回调告诉后台 页码切换到 某某去了 ，然后在后台查询数据的范围是： current*pagesiz-(current+1)*pagesiz，然后返回json中要带有current传进去的数据
            },
            current:data.result.page, // 这里的page页数是后台传过来的。
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal: () => {   //showTotal是分页前面显示的html代码
                return `共${data.result.total}条数据`
            },
            showQuickJumper:true,

        }
        return page;
    },

    getLocation(){  //用于获取每个收货地址的经纬度。
        //定位开始 //to-do 到时候依据这个创建用户的时候直接定位
        var map = new window.BMap.Map('mapsss',{enableMapClick:false}); //把百度地图这个map挂载到我们作用域上去
        var localSearch = new window.BMap.LocalSearch(map);
        var poi;
        var keyword = "杭州市西湖区浙江外国语学院";
        localSearch.setSearchCompleteCallback(function (searchResult) {
            poi = searchResult.getPoi(0);
            console.log(poi.point.lng + "," + poi.point.lat)
        });   
        localSearch.search(keyword);
        console.log(localSearch)
        //定位结束
    },

    getOptionList(data){
        if(!data){
            return []
        }
        let options = [];//[<Option value='0' key='all_key'></Option>];  //这里之所以加大括号是因为，把里面的<option>当成一个变量了 而options就相当于一个泛型。
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },

    updateSelectedItem(selectedRowKeys,selectedIds,list,selectedItem){
        if(selectedRowKeys){
            if(list.length>2){
                document.getElementById("Odetail").setAttribute('disabled','true');
            }else{
                document.getElementById("Odetail").removeAttribute("disabled");
            }

            this.setState({
                selectedRowKeys:selectedRowKeys,
                selectedId:selectedIds,
                idListss:list,
                selectedItem:selectedItem
            })

        }else{
            this.setState({
                selectedRowKeys:selectedRowKeys,
                selectedIds
            })
        }

        
    }


    
}