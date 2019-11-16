import React, { Component } from 'react';

import "./HeaderComponent.css";

export default class HeaderComponent extends Component {
    
    render() {
        return(
            <header id="header">
                <h4>Wellcome {this.props.data.name + ' ' + this.props.data.firstName} {this.props.data.lastName !== '' ? this.props.data.lastName : ''}</h4>
                <button className="btn" onClick={ this.props.click }>Logout</button>
            </header>
        )
    }
}