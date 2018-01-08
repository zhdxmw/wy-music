import React from 'react'
import $http from '../../axios'
import BScroll from 'better-scroll'
import {Carousel,WhiteSpace,WingBlank,List} from 'antd-mobile'
import WrappedComponent from '../../hoc/Index'
import './newSong.css'
import playIcon from '../../static/images/order-ring.png'


const Item = List.Item;


var that;
class NewSong extends React.Component{
    constructor(){
        super();
        that = this;
        this.state = {
            scroller:'',
            title: 'NewSong',
            bannerList:[],
            imgHeight: 176,
            songList:[]
        }
        $http.get('/proxy/?json=true').then(res => {

            that.setState({
                bannerList : res.data.banner,
                songList : res.data.data,
                title : 'Change'
            })
            console.log(that.state.bannerList)
        })

        $http.get('/sproxy/search/song?format=json&keyword=3&page=1&pagesize=30&showtype=1').then(res => {
            console.log(res)
        })
    }
    componentWillMount() {

    }
    componentDidUpdate() {
        if(that.state.scroller){
            that.state.scroller.refresh()
        }else{
            that.state.scroller = new BScroll(that.refs.newsWrpper,{
                click:true,
                scrollbar:true
            });
        }
    }

    render() {
        var songList = this.state.songList.map((item,index) => (
            <Item onClick = {this.props.play.bind(this,this.state.songList,index,item.hash)} multipleLine key = {index} arrow = "horizontal">
                {item.filename}
                <img src={playIcon} className="play"/>
            </Item>
        ))
        var carousel = this.state.bannerList.map((item,index) => (
            <a
                key={index}
                href="javascript:void(0)"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
                <img
                    src={item.imgurl}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                    }}
                />
            </a>
        ))
        return (
            <div className="newSong" ref="newsWrpper" >
                <div className="wrap">
                    <Carousel
                        autoplay
                        infinite
                        selectedIndex={1}
                        autoplayInterval={3000}
                        resetAutoplay={false}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {carousel}
                    </Carousel>
                    <List className="my-list">
                        {songList}
                    </List>
                </div>

            </div>

        )
    }
}

NewSong = WrappedComponent(NewSong);
export default NewSong