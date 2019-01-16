import React from 'react'
import {Link} from 'react-router-dom'

export default class Homea extends React.Component{
    render(){
        return(
                <div>
                    <ul>
                        <li>
                            <Link to="/main">main</Link>
                        </li>
                        <li>
                            <Link to="/about">about</Link>
                        </li>
                        <li>
                            <Link to="/topic">topic</Link>
                        </li>
                        <li>
                            <Link to="/caixiang">caixiang</Link>
                        </li>
                    </ul>
                    <hr></hr>
                    {this.props.children}
                </div>
        )
    }
}