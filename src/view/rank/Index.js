import React from 'react'
import $http from '../../axios'
import Headnav from '../../component/head/Headnav'
import {Icon} from 'antd-mobile'
import {Link} from 'react-router-dom'
import './rank.css'

class Rank extends React.Component{
    constructor(){
        super();
        this.state = {
            rankList:''
        }
        $http.get('/proxy/rank/list&json=true').then(res => {
           this.setState({
               rankList:res.data.rank.list
           })
        })
    }
    render() {
        const rankList = this.state.rankList.length > 0 && this.state.rankList.map( (item,index) => (
                <Link key={index}  className="rankItem" to={'/rankList/' + item.rankid}>
                    <img src={item.imgurl.replace('{size}', '400')} alt="index" className="rankImg"/>
                    <div className="rankName">{item.rankname}</div>
                    <div className="rankIcon"><Icon type="right" size="md"/></div>
                </Link>
            ))
        return (
            <div className="rank">
                <Headnav path={this.props.location.pathname}/>
                <div className="rankList">
                    {rankList}
                </div>
            </div>
        )
    }
}

export default Rank
