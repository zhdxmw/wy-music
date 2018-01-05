import React from 'react'
import {
    Router,
    Route,
    Link
} from 'react-router-dom'

import App from '../App'
import NewSong from '../view/newsong/Index'
import Rank from '../view/rank/Index'
import RankInfo from '../view/rank/Info'
import history from '../history'
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
                        <Route  path='/rank/:id' component={Rank}/>
                        <Route path='/rankInfo/:id' component={RankInfo}/>
                    </App>
                </Router>
            </div>
        )
    }
}

export default ROUTER