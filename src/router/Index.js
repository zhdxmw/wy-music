import React from 'react'
import {
    Router,
    Route
} from 'react-router-dom'

import App from '../App'
import NewSong from '../view/newsong/Index'
import Rank from '../view/rank/Index'
import RankInfo from '../view/rank/Info'
import RankList from '../view/rank/List'
import Hot from '../view/hot/Index'
import HotList from '../view/hot/List'
import history from '../history'
import Singer from '../view/singer/Index'
import SingerList from '../view/singer/List'
import SingerSongs from '../view/singer/Songs'

class ROUTER extends React.Component{
    render() {
        return (
            <div className="router">
                <Router history={history}>
                    <App>
                        {/*<ul>*/}
                            {/*<li><Link to="/">newsong</Link></li>*/}
                            {/*<li><Link to="/rank/11">rank</Link></li>*/}
                            {/*<li><Link to="/rankInfo/11">info</Link></li>*/}
                        {/*</ul>*/}
                        <Route exact path='/' component={NewSong}/>
                        <Route path='/rank' component={Rank}/>
                        <Route path='/rankList/:id' component={RankList}/>
                        <Route path='/rankInfo' component={RankInfo}/>
                        <Route path='/hot' component={Hot}/>
                        <Route path='/hotlist/:id' component={HotList}/>
                        <Route path='/singer' component={Singer}/>
                        <Route path="/singerlist/:id" component={SingerList}/>
                        <Route path="/songs/:id" component={SingerSongs}/>




                    </App>
                </Router>
            </div>
        )
    }
}

export default ROUTER