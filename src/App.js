import React from 'react'
import Header from './component/head/Index'
import Player from './component/play/Player'
class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Player/>
                <div className="content">{this.props.children}</div>
            </div>
        )
    }
}
export default App