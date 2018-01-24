import React from 'react'
import WrappedComponent from '../../hoc/Index'
import {Icon,Button} from 'antd-mobile'
import $http from '../../axios'
import BScroll from 'better-scroll'
import './query.css'

const options = {
    click:true,
    scrollbar:true,
    fade: true,
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
class Query extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hot: [],
            list: [],
            search:'',
            page:1,
            pagesize:20,
            scroller: false,
            load: '',
            enablescroll: true,
            total: 0
        }
        $http.get('/sproxy/search/hot?format=json&plat=0&count=30').then( res => {
            this.setState({
                hot: res.data.data.info
            })
        })
    }
    change(event){
        this.setState({
            search: event.target.value,
            list: [],
            scroller: false
        })
    }
    hotSearch(keyword){
        this.setState({
            search: keyword
        })
        this.query();
    }
    query(callback){
        $http.get('/sproxy/search/song?format=json',{
            params:{
                keyword:this.state.search,
                page: this.state.page,
                pagesiez:this.state.pagesize,
                showtype: 1
            }
        }).then(res => {
            const data = res.data.data;
            const arr = this.state.list;
            arr.push(...data.info)
            this.setState({
                list: arr,
                total: data.total
            })
            const count = this.state.page * this.state.pagesize
            if(count < data.total){
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
    componentDidUpdate() {
        if(this.state.scroller){
            console.log(123)
            this.state.scroller.refresh()
        }else{
            this.state.list.length && this.setState({
                scroller: new BScroll(this.list,options)
            })
        }
    }
    render(){
        if(this.state.scroller){

            this.state.scroller.on('scroll',(pos) => {


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
                const count = this.state.page * this.state.pagesize
                if(this.state.enablescroll && count < this.state.total){
                    this.setState({
                        enablescroll: false,
                        page: this.state.page + 1,
                        load:'加载中....'
                    })
                    this.query(() => {
                        this.state.scroller.finishPullUp();
                        this.setState({
                            enablescroll: true
                        })
                    })
                }
            })


        }

        const hot = this.state.hot.length > 0 && this.state.hot.map((item,index) => (
            <li className="hot-item" key={index} onClick={this.hotSearch.bind(this,item.keyword)}>
                {item.keyword}
                <div className="icon">
                    <Icon type="right"/>
                </div>
            </li>
            ))
        const list = this.state.list.length > 0 && this.state.list.map((item,index) => (
            <div className="list-item" key={index} onClick={this.props.play.bind(this,this.state.list,index,item.hash)}>
                <div className="name text-hide">{item.filename}</div>
                <div className="icon">
                    <Icon type="right"/>
                </div>
            </div>
            ))
        return (
            <div className="query-wrap">
                <div className={this.props.showQuery ? 'show-query' : 'hide-query'}>
                    <div className="query-common">
                        <div className="code">
                            <div className="icon"><Icon type="search"/></div>
                            <input type="text" ref={el => this.search = el } value={this.state.search} onChange={this.change.bind(this)}/>
                        </div>
                        <div className="btn-wrap">
                            <Button type="primary" size="md" style={{height:'35px',lineHeight:'35px'}} onClick={this.query.bind(this)}>搜索</Button>
                        </div>
                    </div>
                    <div className="hot-search-wrap">
                        <h3>热门搜索</h3>
                        <ul className="hot-search">
                            {hot}
                        </ul>
                    </div>
                    {
                        this.state.list.length > 0 && (
                            <div className="query-result-wrap" ref={el => this.list = el}>
                                <div className="result-wrap">
                                    {list}
                                    <div className="bottom-state">
                                        {this.state.load}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
}

Query = WrappedComponent(Query)

export default Query