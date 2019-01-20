import React from 'react'
import {Card,Button,Modal} from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class Rich extends React.Component{
    state={
        editorState:'',
        showRichText:false
    }

    onEditorStateChange = (editorState)=>{
        this.setState({   //保存富文本的状态
            editorState, //通过这种方法就可以使编译器改变后把editorState保存到域上
        })
    }
    handleClearContent = ()=>{
        this.setState({
            editorState:''
        })
    }
    handleGetContent = ()=>{
        this.setState({
            showRichText:true
        })
    }
    onContentStateChange = (contentState)=>{
        this.setState({
            contentState,  //其实就是我们输入的内容
        });
    }
    render(){
        const {editorState} = this.state //this.state是一个根域 editorState是从根域那里解析出来的。
        return (<div>
            <Card>
                <Button type="primary" onClick={this.handleClearContent}>清空文本</Button>
                <Button type="primary" onClick={this.handleGetContent}>获取html</Button>
            </Card>
            <Card title="富文本编辑器" >
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onContentStateChange}

                />
            </Card>

            <Modal
                title="富文本"
                visible={this.state.showRichText}
                onCancel={()=>{
                    this.setState({
                        showRichText:false
                    })
                }}
                footer={null}
            >
                {draftToHtml(this.state.contentState)} 
            </Modal>
            
        </div>)
    }
} 