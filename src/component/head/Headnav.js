import {Tabs} from 'antd-mobile'
import React from 'react'
import history from '../../history'

const tabs = [
    { title: '新歌',href: '/' },
    { title: '排行' ,href: '/rank/1' },
    { title: '歌单' ,href: '/rankInfo/2' },
    { title: '歌手' ,href: '/rank/3' },
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
        return(
                <div className="headnav">
                    <Tabs tabs={tabs}
                          initialPage = {this.state.tapIndex}
                          onTabClick={(taps,index) =>  this.changePage(taps,index) }
                    ></Tabs>

                </div>
            )
        }
}

export default Headnav