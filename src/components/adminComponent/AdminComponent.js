import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default class AdminComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    // this.refreshItemsTable();
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
    axios.delete(`http://localhost:8180/user/delete?id=`+id).then(res => {
      this.refreshUsersTable();
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

  logout = () => {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();

    this.setState({
      redirect: true
    });
  };

  render() {
    console.log(this.state);
    if (this.state.users !== null) {
      if (this.state.redirect || this.state.userData.role !== "ADMIN") {
        return <Redirect to="/" />;
      }
      return (
        <Fragment>
          <HeaderComponent data={this.state.userData} click={this.logout} />

          <div id="table" className="container">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="new-item">
                    <td>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={this.inputHandler}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={this.inputHandler}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={this.inputHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        onChange={this.inputHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.inputHandler}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={this.userCreationHandler}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </td>
                  </tr>
                  {this.state.users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => this.deleteUserHandler(user.id)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return <div className="spinner-border text-muted"></div>;
    }
  }
}
