import React from 'react'
import {Link} from 'react-router-dom'
import {Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import * as playerAction from '../../redux/action/Index'
import {bindActionCreators} from 'redux'
import './header.css'
import logo from '../../static/images/logo.png'

class Header extends React.Component{
    toggleQuery(){
        var showQuery = !this.props.showQuery;
        this.props.changeSongActions.query({showQuery:showQuery})
    }
    hideQuery(){
        this.props.changeSongActions.query({showQuery:false})
    }
    render() {
        return (
            <div className="header">
                <div className="logo-container">
                    <Link className="home" to="/" onClick={this.hideQuery.bind(this)}>
                        <img src={logo} alt=""/>
                    </Link>
                    <div className="query-icon" onClick={this.toggleQuery.bind(this)}>
                        <Icon type="search"/>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {showQuery:state.change_song.showQuery}
}

function mapDispatchToProps(dispatch) {
    return {
        changeSongActions: bindActionCreators(playerAction,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
