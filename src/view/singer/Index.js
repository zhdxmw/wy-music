import React from 'react'
import $http from '../../axios'
import Headnav from '../../component/head/Headnav'
import {Link} from 'react-router-dom'
import {Icon} from 'antd-mobile'
import './singer.css'

class Singer extends React.Component{
    constructor(){
        super()
        this.state = {
            list: []
        }
        $http.get('/proxy/singer/class&json=true').then(res => {
            this.setState({
                list: res.data.list
            })
        })
    }

    render(){
        return (
            <div>
                <Headnav path = {this.props.location.pathname}/>
                <div className="singer-type">
                    <div className="singer-group">
                        <Link to={'/singerlist/88'}>热门歌手 <Icon className="icon" type="right"/></Link>
                    </div>
                    <div className="singer-group">
                        <Link to={'/singerlist/1'}>华语男歌手 <Icon className="icon" type="right"/></Link>
                        <Link to={'/singerlist/2'}>华语女歌手 <Icon className="icon" type="right"/></Link>
                        <Link to={'/singerlist/3'}>华语组合 <Icon className="icon" type="right"/></Link>
                    </div>
                    <div className="singer-group">
                        <Link to={'/singerlist/4'}>日韩男歌手 <Icon className="icon" type="right"/></Link>
                        <Link to={'/singerlist/5'}>日韩女歌手 <Icon className="icon" type="right"/></Link>
                        <Link to={'/singerlist/6'}>日韩组合 <Icon className="icon" type="right"/></Link>
                    </div>
                    <div className="singer-group">
                        <Link to={'/singerlist/7'}>欧美男歌手 <Icon className="icon" type="right"/></Link>
                        <Link to={'/singerlist/8'}>欧美女歌手 <Icon className="icon" type="right"/></Link>
                        <Link to={'/singerlist/9'}>欧美组合 <Icon className="icon" type="right"/></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Singer