import React from 'react'
import {Link} from 'react-router-dom'
import Headnav from './Headnav'
import './header.css'
import logo from '../../static/images/logo.png'

class Header extends React.Component{
    render() {
        return (
            <div className="header">
                <div className="logo-container">
                    <Link className="home" to="/">
                        <img src={logo} alt=""/>
                    </Link>
                </div>
                <Headnav/>
            </div>
        )
    }
}

export default Header