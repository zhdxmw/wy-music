import React from 'react'
import Title from '../../component/title/Title'
import $http from '../../axios'
import { Icon } from 'antd-mobile'
import BScroll from 'better-scroll'
import WrappedComponent from '../../hoc/Index'
import './list.css'

const options = {
    click:true,
    scrollbar:true,
    probeType: 3
}
options.pullDownRefresh = {
    threshold: 90, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
    stop: 40 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
}
options.pullUpLoad = {
    threshold: -60, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
    moreTxt: 'Load More',
    noMoreTxt: 'There is no more data'
}

// var before = 0;
class HotList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            info:{},
            list:[],
            page: 1,
            pageSize:0,
            isLoading: true,
            show: false,
            scroller: false,
            bg:'rgba(98,98,98,0.3)',
            load: ''
        }
        this.getData();
    }

    componentDidUpdate() {
        if(this.state.scroller){
            this.state.scroller.refresh()
        }else{
            this.setState({
                scroller: new BScroll(this.list,options)
            })
        }
    }

    getData(callback){
        $http.get('/proxy/plist/list/?json=true',{
            params:{
                specialid:this.props.match.params.id,
                page: this.state.page
            }
        }).then(res => {
            const data = res.data;
            const arr = this.state.list;
            arr.push(...data.list.list.info)
            this.setState({
                info: data.info.list,
                list: arr,
                page: data.list.page,
                pageSize: data.list.pagesize
            })
            const count = arr.pagesize * arr.page;
            if(count < arr.total){
                this.setState({
                    load: '下拉加载'
                })
            }else{
                this.setState({
                    load: '没有更多数据'
                })
            }

            if(typeof callback === 'function'){
                callback()
            }
        })
    }
    toggleDesc(){
        this.setState({
            show: !this.state.show
        })
    }
    render(){
        if(this.state.scroller){
            this.state.scroller.on('scroll',(pos) => {
                // if(pos.y < 0 && pos.y > -200){
                //     var ceil = Math.abs(before - pos.y )
                //     if(ceil > 10){
                //         before = pos.y;
                //        // console.log(pos.y)
                //         this.setState({
                //             bg:'rgba(44,162,249,' + pos.y/(-180) +')',
                //         })
                //     }
                // }
            })
            this.state.scroller.on('scrollEnd',(pos) => {

            })
            this.state.scroller.on('pullingDown',() => {
                //获取最新数据
                setTimeout(() => {
                    this.state.scroller.finishPullDown()
                    this.state.scroller.scrollTo(0,0,0)
                },1000)

            })
            this.state.scroller.on('pullingUp',() => {
                const count = this.state.page * this.state.pageSize
                if(this.state.enablescroll && count < this.state.total){
                    this.setState({
                        enablescroll: false,
                        page: this.state.page + 1,
                        load:'加载中....'
                    })
                    this.getData(() => {
                        this.state.scroller.finishPullUp();
                        this.setState({
                            enablescroll: true
                        })
                    })
                }
            })
        }


        const List = this.state.list.length > 0 && this.state.list.map((item,index) => (
            <div className="hot-item" key={index} onClick={this.props.play.bind(this,this.state.list,index,item.hash)}>
                <div className="name text-hide"> {item.filename} </div>
                <div className="icon">
                    <Icon type="right"/>
                </div>
            </div>
            ))
         const kvImg = this.state.info.imgurl && this.state.info.imgurl.replace('{size}','400')
         return(

            <div className="hot-list-info" >
                <Title title={this.state.info.specialname} bg={this.state.bg}/>
                <div className="hot-songs-list" ref={(el) => this.list = el}>
                    <div className="container">
                        <div className="kv">
                            <div className="kv-img">
                                <img src={kvImg} alt=""/>
                            </div>

                            <div className="desc">
                                <p className={this.state.show ? 'show-all-desc' : 'show-part-desc'}> {this.state.info.intro} </p>
                                <div className="icon" onClick={this.toggleDesc.bind(this)}>
                                    <Icon type={this.state.show ? 'up' : 'down'} size="md"/>
                                </div>
                            </div>
                        </div>
                        <div className="songs-list">
                            {List}
                        </div>
                    </div>
                </div>
                <div className="bottom-state">
                    {this.state.load}
                </div>
            </div>
        )
    }
}

HotList = WrappedComponent(HotList)

export default HotList