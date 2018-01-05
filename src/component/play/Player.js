import React from 'react'
import './player.css'

import WrappedComponent from '../../hoc/Index'

class Player extends React.Component{
    render() {
        return (
            <div className="player"  onClick={this.props.play.bind(this,111)}>
                <audio src={this.props.audio.songUrl} autoPlay ref="audioPlayer" id="audioPlayer" className="audioPlayer"></audio>
                <div className="audioControl"></div>
                <div className="audio-panel">
                    <div>
                        {this.props.songurl}
                    </div>
                    <img src={this.props.audio.imgUrl} alt=""/>

                </div>
            </div>
        )
    }
}

Player = WrappedComponent(Player);

export default Player