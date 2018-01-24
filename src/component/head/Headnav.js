import React from 'react'
import {Link} from 'react-router-dom'
import './headnav.css'
const tabs = [
    { title: '新歌',href: '/' },
    { title: '排行' ,href: '/rank' },
    { title: '热歌' ,href: '/hot' },
    { title: '歌手' ,href: '/singer' },
];
class Headnav extends React.Component{
    constructor(){
        super();
        this.state = {
            tapIndex:2
        }
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