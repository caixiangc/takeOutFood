import React from 'react'
import { Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom' 
import './index.less'

import MenuConfig from './../../config/menuConfig'
import SubMenu from 'antd/lib/menu/SubMenu';
import MenuItem from 'antd/lib/menu/MenuItem';


// 可以获取到Menu.Item 里面的key="1"
function handleClick(e) {
  console.log('click', e);
}

export default class NavLeft extends React.Component{

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({menuTreeNode});
    }

    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render(){
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg"></img>
                    <h1>takeOut MS</h1>
                </div>
                <Menu onClick={handleClick} mode="vertical" theme="dark">
                    { this.state.menuTreeNode }
                </Menu>
            </div>
            
        )
    }
}