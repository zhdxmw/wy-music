import React from 'react'
import './title.css'
import history from '../../history'
class Title extends React.Component{
    constructor(props){
        super(props)
    }
    goback(){
       history.go(-1)
    }
    render(){
        return(
            <div className="title-wrap">
                <div className="back-icon" onClick={this.goback.bind(this)}></div>
                <div className="title">
                    {this.props.title}
                </div>
            </div>
        )
    }
}

export default Title