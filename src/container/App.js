import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "../components/Login";
import Items from "../components/ItemsComponent";

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
        <Route path="/" exact render={() => <Login authenticated= { this.state.authenticated } />} />
        <Route path="/items" exact render={() => <Items  authenticated= { this.state.authenticated }/>} />
      </BrowserRouter>
    );
  }
}
