import JsonP from 'jsonp'
import axios from 'axios'
import { Modal,message } from 'antd';
import Utils from './../utils/utils'
export default class Axios{

    //自带pagination的功能不用你多加 和CTable 组合使用，最总数据渲染在 this.state.list上面
    static requestList(_this,url,params,isMock,methods){
        var data ={
            params: params
        }
        this.ajax({   //这里 ajax({params}),{params}其实就是个参数，我么写成{a,b,c}是因为参数是个对象。
            url,  //这种写法就是 url:url;
            data,
            isMock,
            methods:methods
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.list.map((item, index) => {
                    item.key = index;
                    return item;  
                    //因为这里定义了一个list来接受所以要注意这里一定要return 否者这个item.list还是老的那个数组
                });
                _this.setState({  // 注意这里的this的域就是外部的域（调用它的域）
                    list:list,
                    pagination:Utils.pagination(data,(current)=>{ //只要在在组件中加入pagination ，就可以调用 分页组件的api了，这里current也是不例外
                        _this.params.page = current;   
                        _this.requestList();  //通过回调来出发分页时间。
                    })
                })
            }
        })
    }
    //mydetails List page
    static requestDetailList(_this,url,params,isMock,methods){
        var data ={
            params: params
        }
        this.ajax({   //这里 ajax({params}),{params}其实就是个参数，我么写成{a,b,c}是因为参数是个对象。
            url,  //这种写法就是 url:url;
            data,
            isMock,
            methods:methods
        }).then((data)=>{
            if(data){
                let list = data.data.map((item, index) => {
                    item.key = index;
                    return item;  
                    //因为这里定义了一个list来接受所以要注意这里一定要return 否者这个item.list还是老的那个数组
                });
                data.currentPage = params.page;
                data.currentPSize = params.size;
                _this.setState({  // 注意这里的this的域就是外部的域（调用它的域）
                    detailList:list,
                    pagination:Utils.myPagination(data,(current)=>{ //只要在在组件中加入pagination ，就可以调用 分页组件的api了，这里current也是不例外
                        _this.paramsName.page = current;   
                        _this.requestDetailListin();  //通过回调来出发分页时间。
                    })
                })
            }
        })
    }

    //unTablePagination-begin
    static unTableRequestList(_this,url,params,isMock,methods){
        var data ={
            params: params
        }
        this.ajax({   //这里 ajax({params}),{params}其实就是个参数，我么写成{a,b,c}是因为参数是个对象。
            url,  //这种写法就是 url:url;
            data,
            isMock,
            methods:methods
        }).then((res)=>{
            if(res){
                // let lists ="";
                // res.data.map((item, index) => {
                //     //lists += "<div className=\"items\"><Card hoverable style={{ width: 300 }} cover={<img alt=\"example\"  src=\"/assets/as.jpg\"/>}> <Meta title='"+item.productName+"' description='"+item.productDescription+"' /> <div className=\"itemselect\"> <a data-id='"+item.productDescription.productId+"'>立即购买</a> <a>加入购物车</a> </div> </Card></div>"
                //     //lists += "<div className=\"items\"><img src=\"/assets/as.jpg\"></img><h3>'"+item.productName+"'</h3><h5>'"+item.productDescription+"'</h5><div className=\"itemselect\"><a data-id='"+item.productDescription.productId+"'>立即购买</a><a>加入购物车</a></div></div>"
                //     lists +="<div className=\"items\" style={{float:\"left\",border: \"1px solid #e9e9e9\",width: \"20%\",marginRight: \"3%\",marginTop: \"2%\"}}><img src=\"/assets/as.jpg\" style={{width: \"100%\"}}></img><h3 style={{margin: \"20px 20px\"}}>'"+item.productName+"'</h3><h5 style={{margin: \"20px 20px\"}}>'"+item.productDescription+"'</h5><div style={{margin:\"27px 13px\",marginTop: \"30px\",display: \"flex\"}} className=\"itemselect\"><div data-id='"+item.productId+"' style={{border:\"1px solid salmon\",color: \"salmon\",textAlign: \"center\",width: \"130px\",height: \"36px\",fontSize: \"20px\",marginRight: \"10px\",display: \"block\"}}>立即购买</div><div data-id='"+item.productId+"' style={{border: \"1px solid salmon\",color: \"salmon\",textAlign: \"center\",width: \"130px\",height: \"36px\",fontSize: \"20px\",marginRight: \"10px\",display: \"block\"}}>加入购物车</div></div></div>"
                // });
                //console.log(lists);
                _this.setState({  
                    list:res.data,
                    //list:lists,
                    loading:false,
                    total:res.total
                })
                //_this.list = list;
            }
        })
    }

    //unTablePagination-close



    static jsonp(options){
        return new Promise((resolve,reject)=>{  //****** */
            JsonP(options.url,{param:'callback'},
            function (err,response){
                //todo
                debugger;
                if(response.resultcode == '200'){
                    resolve(response); //resolve（）成功之后把数据返回回去
                }else{
                    reject(response.message);
                }
            })
        })
    }

    static jsonpss(options){
        return new Promise((resolve,reject)=>{  //****** */
            JsonP(options.url,
            function (err,response){
                //todo
                debugger;
                if(response.code == 0){
                    resolve(response); //resolve（）成功之后把数据返回回去
                }else{
                    reject(response.message);
                }
            })
        })
    }

    static jsonptoken(options){
        return new Promise((resolve,reject)=>{  //****** */
            JsonP(options.url,{timeout:200},
            function (err,response){
                //todo
                debugger;
                if(response.status == '200'){
                    resolve(response); //resolve（）成功之后把数据返回回去
                }else{
                    reject(response.message);
                }
            })
        })
    }



    static ajax(options){
        let baseUrl = ''; 
        if(options.isMock==null){
            options.isMock=true;
        }
        //let baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        if(options.isMock){
            baseUrl = 'https://www.easy-mock.com/mock/5c2e0ba7c8123b4eccf80408/mockapi'
        }else{
            baseUrl = 'http://localhost:8087/sell/'
            //等有真正的接口的时候，把这里替换成真正的接口
        }
        if(options.methods==null){
            options.methods="get"
        }
        let loading;
        if((options.data && options.data.isShowloading) != false){
            loading = document.getElementById("ajaxLoading");  //打包的时候回加载这个public html，当我们需要的时候把这个loading的html给block，数据加载好了就none 
            loading.style.display= 'block'; //把页面加载的动画写在公共方法，，只要外部调用了axios 就是
        }

        return new Promise((resolve,reject)=>{  //promise 会接收一个回调函数,这个回调函数，当解析成功的时候会调用resolve去返回，不成功就会调用reject去返回
            axios({
                url:options.url,
                method:options.methods,
                baseURL:baseUrl,
                timeout:5000,
                params:(options.data && options.data.params) ||'' // 意思是如果options.data存在那么就去取options.data.param 否者就去 ‘’
            }).then((response)=>{
                if((options.data && options.data.isShowloading) != false){
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display= 'none';
                }
                if(response.status=='200'){
                    if(response.data.code==0){ //这里必须双层‘成功’ 才能保证数据获取到，因为有些情况，http请求成功，但是数据库操作不成功，我们业务code可能不是0
                        resolve(response.data);//这里的resolve方法就相当于把成功的数据给 抛出去
                        //resolve是js引擎提供的，resolve和reject都是个函数，而这个函数的参数是我们ajax请求返回的结构
                    }else{
                        message.error("请求后台接口失败")
                        
                    }
                }else{
                    reject(response.data) //要是调用接口出错那么就调用reject(response.data)，其实就是通过reject打印出来 
                }
            }) //最后通过 .then 接收前面调用接口的返回值
        });
    }

    static ajaxlocal(options){
        let baseUrl = 'https://www.easy-mock.com/mock/5c2e0ba7c8123b4eccf80408/mockapi'

        return new Promise((resolve,reject)=>{  //promise 会接收一个回调函数,这个回调函数，当解析成功的时候会调用resolve去返回，不成功就会调用reject去返回
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
            }).then((response)=>{
                if(response.status=='200'){
                    if(response.data.code==0){ //这里必须双层‘成功’ 才能保证数据获取到，因为有些情况，http请求成功，但是数据库操作不成功，我们业务code可能不是0
                        resolve(response.data);//这里的resolve方法就相当于把成功的数据给 抛出去
                    }else{
                        Modal.info({
                            title:"提示",
                            content:response.data.msg
                        })
                    }
                }else{
                    reject(response.data) //要是调用接口出错那么就调用reject(response.data)，其实就是通过reject打印出来 
                }
            }) //最后通过 .then 接收前面调用接口的返回值
        });
    }

}