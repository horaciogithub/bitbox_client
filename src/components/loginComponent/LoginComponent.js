import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import './LoginComponent.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      role: "",
      errorMessage: ''
    };

    this.formHandler = this.formHandler.bind();
    this.inputHandler = this.inputHandler.bind();
  }

  formHandler = () => {
    let username = this.state.username;
    let pass = this.state.password;

    if (this.state.username === '' || this.state.password === '') {
      return this.setState({ errorMessage: 'You must fill the username and password'})
    }

    axios.get(`http://localhost:8180/basicauth`, {
        auth: {
          username: username,
          password: pass
        }
      })
      .then(res => {
        if (res.status === 200) {
          axios
            .post(`http://localhost:8180/user/data`, {  name: username  })
            .then(res => {
              sessionStorage.setItem("userData", JSON.stringify(res.data)); // User session data
              this.setState({
                isAuthenticated: true,
                role: res.data.role
              })
            })
            .catch(ex=>{
              console.log(ex)
              this.setState({ errorMessage: 'User or password incorrect' })
            }
            );
        }
      }).catch(ex=>{
        this.setState({ errorMessage: 'User or password incorrect' })
      });
  };

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    
    if (this.state.isAuthenticated) {
      if (this.state.role === 'ADMIN') {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/user" />;
      }
    }

    return (
      <div className="form-container">
        <div className="form-group">
          <div className="user-addon"></div>
          <input className="user-input" type="text" name="username" autoComplete="off" onChange={this.inputHandler} placeholder="User" />
        </div>
        <div className="form-group">
          <div className="password-addon"></div>
          <input className="password-input" type="password" name="password" onChange={this.inputHandler} placeholder="Password"/>
        </div>
        <button className="btn" onClick={this.formHandler}>
          Log in <FontAwesomeIcon icon={faSignInAlt} />
        </button>
        {
          this.state.errorMessage !== '' ? <p className="errorMessage">{this.state.errorMessage}</p>:null
        }
      </div>
    );
  }
}
