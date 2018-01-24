import React from 'react'
import Header from './component/head/Index'
import Player from './component/play/Player'
import PlayerDetail from './component/play/PlayDetail'
import Query from './component/query/Index'
class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Player/>
                <PlayerDetail/>
                <Query/>
                <div className="content">{this.props.children}</div>
            </div>
        )
    }
}
export default App