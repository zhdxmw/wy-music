import React from 'react'
import $http from '../../axios'
import Headnav from '../../component/head/Headnav'
import './hot.css'
import { Link } from 'react-router-dom'
import {Icon} from 'antd-mobile'

class Hot extends React.Component{
    constructor(){
        super();
        this.state = {
            hotList:[]
        }
        $http.get('/proxy/plist/index&json=true').then(res => {
            this.setState({
                hotList:res.data.plist.list.info
            })
        })
    }
    render(){
        const List = this.state.hotList.length > 0 && this.state.hotList.map((item,index) => (
                <div className="list-item"  key={index}>
                    <Link to={'/hotlist/' + item.specialid}>
                        <div className="hot-img">
                            <img src={item.imgurl.replace('{size}','400')} alt=""/>
                        </div>
                        <div className="info">
                            <div className="title text-hide"> {item.specialname} </div>
                            <div className="num">
                                <span className="count-icon"></span>
                                {item.playcount}
                            </div>
                        </div>
                        <div className="icon">
                            <Icon type="right"/>
                        </div>
                    </Link>
                </div>
            ))
        return (
            <div className="hotList">
                <Headnav path={this.props.location.pathname}/>
                <div className="list-wrap">
                    {List}
                </div>
            </div>
        )
    }
}
export default Hot