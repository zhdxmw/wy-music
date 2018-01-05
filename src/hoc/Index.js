import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as playerAction from '../redux/action/Index'
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

        play(list,index) {
          // document.getElementById('audioPlayer').pause()
            var listInfo = {
                songList: list,
                songIndex: index
            }
            this.props.changeSongActions.setList({listInfo:listInfo})
        }

        render() {

            return <WrappedComponent {...this.props}  {...this.state} play={this.play.bind(this)}/>
        }
    }
    function mapStateToProps(state) {
        return {player:state.change_song.player,audio:state.change_song.audio,listInfo:state.change_song.listInfo}
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