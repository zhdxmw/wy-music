import React from 'react'
import './player.css'

import WrappedComponent from '../../hoc/Index'

class Player extends React.Component{
    hah(){
        console.log(this.props.listInfo)
    }

    render() {
        var showPlayer = this.props.player.showPlayer ? 'close-audio' : 'open-audio';
        var aduioLoading = this.props.audioLoadding ? 'audioLoading' : '';
        return (
            <div className="player">
                <audio src={this.props.audio.songUrl} onEnded={this.props.nextSong} autoPlay ref="audioPlayer" id="audioPlayer" className="audioPlayer"></audio>
                <div className={'audioControl ' + showPlayer + ' ' + aduioLoading}>
                    {'audioControl ' }
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