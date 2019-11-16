import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./AdminComponent.css";

import HeaderComponent from "../HeaderComponent/HeaderComponent";
import UsersTableComponent from "./usersTableComponent/UsersTableComponent";
import ItemsTableComponent from "./itemsTableComponent/ItemsTableComponent";

export default class AdminComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: 'ACTIVE',
      items: null,
      users: null,
      userData: {},
      redirect: false,

      name: "",
      firstName: "",
      lastName: "",
      role: ""
    };

    this.userCreationHandler = this.userCreationHandler.bind();
    this.inputHandler = this.inputHandler.bind();
    this.refreshUsersTable = this.refreshUsersTable.bind();
    this.refreshItemsTable = this.refreshItemsTable.bind();
    this.deleteUserHandler = this.deleteUserHandler.bind();
    this.clearInputs = this.clearInputs.bind();
    this.logout = this.logout.bind();
  }

  refreshItemsTable = () => {
    axios
      .get(`http://localhost:8180/items/all?state=` + this.state.state)
      .then(res => {
        this.setState({
          items: res.data
        });
      });
  };

  refreshUsersTable = () => {
    axios.get("http://localhost:8180/users/all?").then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  componentDidMount() {
    if (sessionStorage.getItem("userData")) {
      const data = JSON.parse(sessionStorage.getItem("userData"));

      this.setState({
        userData: data
      });
    } else {
      this.setState({
        redirect: true
      });
    }

    this.refreshItemsTable();
    this.refreshUsersTable();
  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  userCreationHandler = () => {
    if (
      this.state.name &&
      this.state.password &&
      this.state.firstName &&
      this.state.role
    ) {
      let data = {
        name: this.state.name,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.role
      };

      axios.post(`http://localhost:8180/user/create`, data).then(res => {
        this.refreshUsersTable();
        this.clearInputs();
      });
    }
  };

  deleteUserHandler = id => {
    axios.delete(`http://localhost:8180/user/delete?id=` + id).then(res => {
      this.refreshUsersTable();
    });
  };

  deleteItemHandler = id => {
    axios.delete(`http://localhost:8180/items/delete?id=` + id).then(res => {
      this.refreshItemsTable();
    });
  };

  clearInputs = () => {
    this.setState({
      name: "",
      password: "",
      firstName: "",
      lastName: "",
      role: ""
    });

    document.getElementById("name").value = "";
    document.getElementById("password").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("role").value = "";
  };

  changeState = () => {
    this.state.state === "ACTIVE"
      ? this.setState({ state: "DISCONTINUED" })
      : this.setState({ state: "ACTIVE" });
    this.refreshItemsTable();
  };

  logout = () => {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();

    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.users !== null) {
      if (this.state.redirect || this.state.userData.role !== "ADMIN") {
        return <Redirect to="/" />;
      }
      return (
        <Fragment>
          <HeaderComponent data={this.state.userData} click={this.logout} />

          <div className="container panel-administrator">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#users"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Items
                </a>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="users"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <UsersTableComponent
                  users={this.state.users}
                  change={this.inputHandler}
                  click={this.userCreationHandler}
                  delete={this.deleteUserHandler}
                />
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
              <ItemsTableComponent
                  items={this.state.items}
                  changeState={this.changeState}
                  delete={this.deleteItemHandler}
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return <div className="spinner-border text-muted"></div>;
    }
  }
}
