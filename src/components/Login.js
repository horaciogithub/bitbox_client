import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticated: false
    };

    this.formHandler = this.formHandler.bind();
    this.inputHandler = this.inputHandler.bind();
  }

  formHandler = () => {
    let username = this.state.username;
    let pass = this.state.password;

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
                isAuthenticated: true
              })
            });
        }
      });
  };

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    
    if (this.state.isAuthenticated) {
      return <Redirect to="/items" />;
    }

    return (
      <div className="form-container">
        <div className="form-group">
          <div className="user-addon"></div>
          <input className="user-input" type="text" name="username" onChange={this.inputHandler} />
        </div>
        <div className="form-group">
          <div className="password-addon"></div>
          <input className="password-input" type="password" name="password" onChange={this.inputHandler} />
        </div>
        <button className="btn" onClick={this.formHandler}>Logearse</button>
      </div>
    );
  }
}
