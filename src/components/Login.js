import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

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
            .post(`http://localhost:8180/user/data`, {  email: username  })
            .then(res => {
              console.log(res.data)
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
      <div>
        Username
        <input type="text" name="username" onChange={this.inputHandler} />
        <br />
        Password
        <input type="password" name="password" onChange={this.inputHandler} />
        <br />
        <button onClick={this.formHandler}>Logearse</button>
      </div>
    );
  }
}
