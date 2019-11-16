import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LoginComponent from "../components/loginComponent/LoginComponent";
import UserComponent from "../components/userComponent/UserComponent";
import AdminComponent from "../components/adminComponent/AdminComponent";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={() => <LoginComponent authenticated= { this.state.authenticated } />} />
        <Route path="/user" exact render={() => <UserComponent  authenticated= { this.state.authenticated }/>} />
        <Route path="/admin" exact render={() => <AdminComponent  authenticated= { this.state.authenticated }/>} />
      </BrowserRouter>
    );
  }
}
