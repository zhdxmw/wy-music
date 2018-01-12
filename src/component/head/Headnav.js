import {Tabs} from 'antd-mobile'
import React from 'react'
import {Link} from 'react-router-dom'
import history from '../../history'
import './headnav.css'
const tabs = [
    { title: '新歌',href: '/' },
    { title: '排行' ,href: '/rank' },
    { title: '热歌' ,href: '/rankInfo' },
    { title: '歌手' ,href: '/rank' },
];
var that;
class Headnav extends React.Component{
    constructor(){
        super();
        that = this;
        this.state = {
            tapIndex:2
        }

    }
    changePage(tap,index){
        history.push(tap.href)
    }
    render() {
        const links = tabs.map((item,index) => (
            <Link to={item.href} key={index} className={this.props.path === item.href ? 'active' : ''}> {item.title} </Link>
        ))
        return(
                <div className="headnav">
                    {links}
                </div>
            )
        }
}

export default Headnav