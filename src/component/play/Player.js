import React from 'react'
import './player.css'

import WrappedComponent from '../../hoc/Index'

class Player extends React.Component{
    hah(){
        console.log(this.props.listInfo)
    }
    togglePlayer(e){
        e.stopPropagation();
        var player = {...this.props.player};
        player.showPlayer = !player.showPlayer;
        this.props.changeSongActions.playState({player:player})
    }
    showDetail() {
        var player = {...this.props.player};
        player.detailPlayerFlag = true;
        this.props.changeSongActions.playState({player:player})
    }
    render() {

        var audioControl = this.props.player.showPlayer ? 'close-audio' : 'open-audio';
        var showPlayer = this.props.player.showPlayer ? 'show-player' : 'hide-player';
        var audioLoading = this.props.audioLoadding ? 'audioLoading' : 'loaded';
        return (
            <div className={'player ' + showPlayer} onClick={this.showDetail.bind(this)}>
                <audio src={this.props.audio.songUrl} onTimeUpdate={this.props.change} onEnded={this.props.nextSong} autoPlay ref="audioPlayer" id="audioPlayer" className="audioPlayer"></audio>
                <div className={'audioControl ' + audioControl + ' ' + audioLoading} onClick={this.togglePlayer.bind(this)}>
                    {this.props.audioLoadding}
                </div>
                <div className="audio-panel">
                    <img src={this.props.audio.imgUrl} className="player-icon" onClick={this.hah.bind(this)}/>
                    <div className="song-info">
                        <div className="song text-hide">{this.props.audio.title}</div>
                        <div className="singer text-hide">{this.props.audio.singer}</div>
                    </div>
                    <div className="control-panel">
                        <span className={this.props.player.isPlay ? 'player-pause' : 'player-play'} onClick={this.props.playState}></span>
                        <span className="nextSong" onClick={this.props.nextSong}></span>
                    </div>
                </div>
            </div>
        )
    }
}

Player = WrappedComponent(Player);

export default Player