import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./HeaderComponent.css";

export default class HeaderComponent extends Component {
    
    render() {
        return(
            <header id="header">
                <h4>{this.props.data.role + ': ' + this.props.data.name + ' ' + this.props.data.firstName} {this.props.data.lastName !== '' ? this.props.data.lastName : ''}</h4>
                <button className="btn" onClick={ this.props.click }>
                    Sign Out <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </header>
        )
    }
}