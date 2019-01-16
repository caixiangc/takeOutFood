import React from 'react'
import {Table} from 'antd'

export default class CTable extends React.Component{
    state={
        idList:[],
        idListReal:[]
    }

    onRowClick = (record,index)=>{
        let rowSelection = this.props.rowSelection;  //这里的this.props是当前的这个<Table> 而不是外面的table
        console.log(record);
        console.log(index);
        let selectedRowKeys = this.props.selectedRowKeys|| [];
        let selectedIds ;
        if(rowSelection == 'checkbox'){
            if(rowSelection == 'checkbox'){
                
                if(selectedRowKeys.length!=0){
                    const i = selectedRowKeys.indexOf(index);
                    if(i==-1){
                        selectedRowKeys.push(index);
                        this.idList.push(record.id);
                    }else{
                        selectedRowKeys.splice(i,1);
                        this.idList = this.idList.map((item)=>{
                            if(item != record.id){
                                return item;
                            }
                        })
                    }
                }else{
                    selectedRowKeys = [index];
                    this.idList = [record.id];
                }
            }
            let listb = "";
            this.idList.map((item)=>{
                if(item){
                    listb = listb + item+','; 
                }
            })
            selectedIds = listb.substr(0, listb.length - 1);
            //console.log("listb:"+selectedIds);

            this.idListReal=[-1];
            this.idList.map((item)=>{
                if(item){
                    this.idListReal.push(item);
                }
            })

            this.props.updateSelectedItem(selectedRowKeys,selectedIds,this.idListReal,record); //调用我们外部组件里面的方法。
        }else{
            let selectedRowKeys = [index];
            let selectedItem = record; //加【】表示存入一个数组，就是到时候显示selectedItem这内容就是 selectedItem[0]:.....,[1].....,[2].....
            this.props.updateSelectedItem(selectedRowKeys,selectedItem); //调用我们外部组件里面的方法。
            // this.props的域是<CTable>的域，我们虽然在CTable调用，其实是在order.js 哪里生效的，即bind(this)，bind也是那里的this，不是这里的this。 
            //相当于A出发出信号，使B处去调用C里面的方法，B出bind(this),把B的作用域（指针）给传到C。
        }
    }

    tableInit = ()=>{
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys; //selectedRowKeys 是要从外部拿来
        const rowSelection = {  //先定义一个默认的
            type:'radio',   //默认单选
            selectedRowKeys,  //指定key 的选中项，需要和 onChange 进行配合，也就是说，只有加上onChange 这个才会起效。
            //只要加上selectedRowKeys 这行字 我们就可以通过点击onChange事件获取每行的索引 ，默认就是一个数组的形式。如[6, 7, 8, 9]
            onChange :this.onSelectChange
        }
        if(row_selection===null || row_selection === false){
            //当组件里面未传值过来的时候，就默认 不需要复选
            row_selection = false;
        }else if(row_selection == 'checkbox'){
            rowSelection.type = 'checkbox';
        }else{
            row_selection = 'radio';
        }
        return(
            <Table
            bordered
            {...this.props} //对this.props 进行解构 ，在外面组件上定义的三个组件都会解构进来。columns={columns} dataSource = {this.state.list} pagination = {this.state.pagination}
            //只要table里面设置了 pagination 就能在方法中调用 pagination里面的api
            rowSelection={row_selection?rowSelection:false}   //控制radio 或者是checkbox
                //下面这个onRow的格式是antd 固定写好的我们不能变
            onRow={(record, index) => { //record是一行的属性，index 是索引
                return {
                    onClick: () => {
                        if(!row_selection){
                            return;
                        }
                        this.onRowClick(record, index);
                        // 这个this的域是<Table> 
                    }
                };
            }}                   
            />
        )
    }
    render(){
        return(
            <div>
                {this.tableInit()}
            </div>
        )
    }
}