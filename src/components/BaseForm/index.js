import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd'
import Utils from './../../utils/utils';
import moment from 'moment';

const Option = Select.Option; 
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;

class FilterForm extends React.Component{   //值所以不直接export 是因为，我们要用antd提供给我们的方法建立双向绑定的功能，如果直接导出就不能双向绑定了。
    handleFilterSubmit = ()=>{  //z在其他地方引用这个baseForm的Submit的时候我们这里处理完了 还要把值传回去
        let fieldsValue = this.props.form.getFieldsValue();  //this.props.form 我们可以获取到整个表单里面所有的内容，因为这个表单是 我们通过antd Form.create({})(FilterForm);去create出来的
                                        //千万不要写成getFieldValue不然错误会找死你
        console.log("fieldsValue:"+fieldsValue);
        console.log(fieldsValue);

        this.props.filterSubmit(fieldsValue); //当点击查询的按钮的时候，按钮的事件是在BaseForm里面触发的，大致的逻辑是 BaseForm 是个公用的组件，在这个组件里面获取到表达的数据然后往外传，在外面渲染出来
    
    }
    dataPickonChange(dates, dateStrings) {
        //console.log('From: ', dates[0], ', to: ', dates[1]);
        //console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    initFormList = ()=>{
        const {getFieldDecorator} = this.props.form;   //这个是帮助我们双向数据绑定的
        const formList = this.props.formList;    //把每个表单不同的部分包装成一个对象的形式传递进来。 外部是这样传进来的<BaseForm formList={this.formList}></BaseForm> //往自定义组件里面传值
        let formItemList=[];
        if(formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;  //field名字取名，方便我们后去获取参数的
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type=='时间查询'){
                    const during_time = <FormItem label="查询时间范围" key='during_time'>
                    {
                        getFieldDecorator('during_time')(
                            <RangePicker 
                            showTime
                            onChange={this.dataPickonChange} 
                            format = "YYYY-MM-DD"
                            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')],'MonthBegin-Today': [moment().startOf('month'), moment()] }}
                            
                            ></RangePicker>
                        )
                    }
                </FormItem>;
                formItemList.push(during_time);
                }
                else if(item.type == 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{  //加中括号，就等于会去解析这个变量
                                valuePropName : 'checked',
                                initialValue:initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                                )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                }
                else if(item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{  //加中括号，就等于会去解析这个变量
                                initialValue : initialValue
                            })(
                                <Input type="text" style={{ width: width }} placeholder={placeholder}></Input>
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                }
                else if(item.type == 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{  //加中括号，就等于会去解析这个变量
                                initialValue : initialValue
                            })(
                                <Select
                                    style={{ width: width }} //width这个变量是上面的那个变量
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                }
                else if(item.type == 'DATEPICKER'){
                    const DATAPICKER = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <DatePicker showTime={true} placeholder={placeholder}></DatePicker>
                            )
                        }    
                    </FormItem>;
                    formItemList.push(DATAPICKER);
                }
            })
        }
        return formItemList;
    }
    
    render(){
        return (<div>
            <Form layout="inline">
                {this.initFormList()}
                <FormItem style={{marginTop:-6}} layout="inline">
                    <Button type="primary" onClick={this.handleFilterSubmit} style={{margin:'0 20px'}}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        </div>)
    }
}

FilterForm = Form.create({})(FilterForm);
export default FilterForm; //最后把这个对象导出