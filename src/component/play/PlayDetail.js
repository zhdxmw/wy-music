import React from 'react'
import WrappedComponent from '../../hoc/Index'
import { Slider,WingBlank } from 'antd-mobile'
import './detail.css'
class PlayerDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            duration: 0
        };
        this.showDetail = this.showDetail.bind(this);
    }
    showDetail() {
        var player = {...this.props.player};
        player.detailPlayerFlag = false;
        this.props.changeSongActions.playState({player:player})
    }
    log = (name) => {
        return (value) => {
            console.log(`${name}: ${value}`);
        };
    }
    //歌词
    songLrc(){
        if (this.props.audio.lyrics) {
            var temp = this.props.audio.lyrics.split('\r\n');
            temp = temp.splice(0, temp.length - 1);
            temp = temp.map((value)=> {
                var time = value.substr(1, 5);
                var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
                var lrcContent = value.substr(10);
                return {
                    seconds,
                    lrcContent
                }
            });
            return temp;
        }
    }
    // 时间转换秒数
    formatTime = (timeTemp) => {
        let m = Math.floor(timeTemp / 60);
        let s = Math.floor(timeTemp % 60);
        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    };

    render() {
        if(this.props.player.detailPlayerFlag){

            var show = this.props.player.detailPlayerFlag ? 'show' : 'hide';
            const currentLength = this.props.audio.currentLength;
            const currentTime = this.formatTime(currentLength);
            const duration = this.formatTime(this.props.audio.songLength)

            const songLyrics = this.songLrc();
            //歌词列表
            const SongList =  songLyrics && songLyrics.map((item,index) => (
                <p className={item.seconds >= currentLength ? 'isCurrentLrc' : ''} key={index}>
                    {item.lrcContent}
                </p>
            ))
            const offset = songLyrics && (songLyrics.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-22)


            return (
                <div className={'playerDetail ' + show }>
                    <div className="detail-bg">
                        <img src={this.props.audio.imgUrl} alt="singerImg"/>
                    </div>
                    <div className="detail-content">
                        <div className="head-title">
                            <div className="back" onClick={this.showDetail}></div>
                            <div className="title">
                               {this.props.audio.title}
                            </div>
                        </div>
                        <div className="singerImg">
                            <img src={this.props.audio.imgUrl} alt="singerImg"/>
                        </div>
                        <div className="lyrics">
                            <div style={{marginTop: offset + 'px'}}>
                                {SongList}
                            </div>

                        </div>
                        <div className="slider-wrap">
                            <div className="current-time">{currentTime}</div>
                            <div className="slider">
                                <Slider
                                    style={{ marginLeft: 16, marginRight: 16 }}
                                    defaultValue={0}
                                    min={0}
                                    max={Math.floor(this.props.audio.songLength)}
                                    value={this.props.audio.currentLength}
                                    handleStyle={{
                                        borderColor:'#ccc',
                                        height:'14px',
                                        width:'14px',
                                        marginLeft:'-7px',
                                        marginTop:'-5.5px',
                                        backgroundColor:'#ccc'
                                    }}
                                    onChange={this.props.change.bind(this,true)}
                                    onAfterChange={this.log('afterChange')}
                                />
                            </div>
                            <div className="duration">{duration}</div>
                        </div>
                        <div className="control-panel">
                            <div className="prev-song" onClick={this.props.prevSong}></div>
                            <div className={this.props.player.isPlay ? 'player-pause' : 'player-play'} onClick={this.props.playState}></div>
                            <div className="next-song" onClick={this.props.nextSong}></div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div></div>
            )
        }

    }
}
PlayerDetail = WrappedComponent(PlayerDetail)
export default PlayerDetail