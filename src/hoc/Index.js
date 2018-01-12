import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as playerAction from '../redux/action/Index'
import $http from '../axios'
const that = this;
export default (WrappedComponent) => {
    class NewComponent extends React.Component {
        constructor(){
            super();
            this.state = {
                title: ''
            }

        }

        componentDidMount() {
            // ……注意订阅数据……
            this.setState({
                title: 'haha',
            })
        }

        componentWillUnmount() {
            //
        }

        setList(list,index,hash){
            var listInfo = {
                songList: list,
                songIndex: index
            }
            this.props.changeSongActions.setList({listInfo:listInfo})
            this.play(hash);
        }

        play(hash) {
            //loading
            this.props.changeSongActions.Loadding({audioLoadding:true})
            $http.get('/dproxy/yy/index.php?r=play/getdata',{
                params:{
                    hash:hash
                }
            }).then(res => {
                res = res.data.data;
                const aduio = {
                    songUrl:res.play_url,
                    imgUrl: res.img,
                    lyrics: res.lyrics,
                    title: res.audio_name,
                    singer: res.author_name,
                    currentLength: 0,
                    songLength: res.timelength / 1000,
                    currentFlag: false
                }
                this.props.changeSongActions.playSong({audio:aduio})

                const player = {...this.props.player};
                player.isPlay = true;
                this.props.changeSongActions.playState({player:player})

                this.props.changeSongActions.Loadding({audioLoadding:false})
            })
        }

        playState(e){
            e.stopPropagation();
            if(this.props.audio.songUrl !== ''){
                var player = {...this.props.player};
                if(player.isPlay){
                    document.getElementById('audioPlayer').pause()
                }else{
                    document.getElementById('audioPlayer').play()
                }
                player.isPlay = !player.isPlay;
                this.props.changeSongActions.playState({player:player})
            }
        }
        nextSong(e){
            if(e){
                e.stopPropagation();
            }
            if(this.props.audio.songUrl !== ''){
                var index = this.props.listInfo.songIndex === this.props.listInfo.songList.length -1 ? 0 : this.props.listInfo.songIndex + 1;

                var hash = this.props.listInfo.songList[index].hash;

                this.setList(this.props.listInfo.songList,index,hash);
            }

        }

        prevSong(){
            if(this.props.audio.songUrl !== ''){
                var index = this.props.listInfo.songIndex === 0 ? this.props.listInfo.songList.length -1 : this.props.listInfo.songIndex - 1;

                var hash = this.props.listInfo.songList[index].hash;

                this.setList(this.props.listInfo.songList,index,hash);
            }

        }
        timeUpdate(params,value){
            var time;
            if(params === true){
                //手动设置播放时间
                time = value;
                document.getElementById('audioPlayer').currentTime = value;
            }else{
                time = document.getElementById('audioPlayer').currentTime;
            }
            var audio = {...this.props.audio}
            audio.currentLength = time;
            this.props.changeSongActions.playSong({audio:audio})
        }

        render() {
            //prevSong={this.props.prevSong.bind(this)}
            return <WrappedComponent {...this.props}  {...this.state}  play={this.setList.bind(this)} prevSong={this.prevSong.bind(this)} change={this.timeUpdate.bind(this)} nextSong={this.nextSong.bind(this)} playState={this.playState.bind(this)}/>
        }
    }
    function mapStateToProps(state) {
        return {player:state.change_song.player,audio:state.change_song.audio,listInfo:state.change_song.listInfo,audioLoadding:state.change_song.audioLoadding}
    }
    function mapDispatchToProps(dispatch) {
        return {
            //通过bindActionCreators把dispath注入进action中，调用action，则会自动触发dispath，修改store
            changeSongActions: bindActionCreators(playerAction,dispatch)
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(NewComponent)
}