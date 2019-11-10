import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./ItemsComponent.css";

import InfoModal from "./infoModal/infoModal";
import EditModal from "./editModal/EditModal";

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      userData: {},
      filter: "ACTIVE",
      redirect: false,
      itemCode: 0,
      description: "",
      state: "ACTIVE",
      price: null,
      creator: null
    };
  }

  refreshTable = () => {
    axios
      .get(`http://localhost:8180/items/all?state=` + this.state.state, {
        auth: {
          username: "horacio",
          password: "1234"
        }
      })
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  };

  clearInputs = () => {
    this.setState({
      itemCode: 0,
      description: "",
      state: "ACTIVE",
      price: null,
      creator: null
    });

    document.getElementById("itemCode").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
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

    this.refreshTable();
  }

  formatDate = date => {
    if (date !== null) {
      let dateArr = date.split("-");
      return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    } else {
      return date;
    }
  };

  inputHandler = e => {
    if (e.target.name === "itemCode" && this.state.itemCode.length >= 19) {
      console.log(this.state.itemCode.length);
      document.getElementById("itemCode").value = this.state.itemCode;
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  formHandler = () => {
    if (this.state.itemCode.length > 0 && this.state.description.length > 0) {
      axios
        .post(`http://localhost:8180/items/create`, {
          itemCode: this.state.itemCode,
          description: this.state.description,
          state: this.state.state,
          price: this.state.price,
          creator: {
            id: this.state.userData.id
          }
        })
        .then(res => {
          this.refreshTable();
          this.clearInputs();
        });
    }
  };

  changeState = () => {
    this.state.state === "ACTIVE"
      ? this.setState({ state: "DISCONTINUED" })
      : this.setState({ state: "ACTIVE" });
    this.refreshTable();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    let i = 1; // Suppliers second id map

    return (
      <div id="table" className="container">
        {this.state.data != null ? (
          <div className="table-responsive">
            <table
              className="tabla table table-dark table-bordered table-hover"
              border="1"
            >
              <thead>
                <tr>
                  <th>Item code</th>
                  <th>Description</th>
                  <th>
                    <div className="state-container">
                      <p> State</p>
                      <button onClick={this.changeState} />
                    </div>
                  </th>
                  <th>Price</th>
                  <th>Creation date</th>
                  <th>Creator</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="number"
                      id="itemCode"
                      name="itemCode"
                      onChange={this.inputHandler}
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      onChange={this.inputHandler}
                    />
                  </td>
                  <td>
                    <select name="state" onChange={this.inputHandler}>
                      <option value="ACTIVE" defaultValue>
                        ACTIVE
                      </option>
                      <option value="DISCONTINUED">DISCONTINUED</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      onChange={this.inputHandler}
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={this.formHandler}
                    >
                      Add Item
                    </button>
                  </td>
                </tr>
                {this.state.data.map(item => (
                  <tr key={item.itemCode}>
                    <td>{item.itemCode}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.state}
                      {item.state === "ACTIVE" ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target={"#edit" + item.itemCode}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      ) : null}
                    </td>
                    <td>{item.price != null ? item.price + " €" : ""}</td>
                    <td>{this.formatDate(item.creationDate)}</td>
                    <td>{item.creator.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target={"#id" + item.itemCode}
                      >
                        See details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {this.state.data != null ? (
          <div>
            <InfoModal
              counter={this.id}
              data={this.state.data}
              formatDate={this.formatDate}
            />
            <EditModal data={this.state.data} refreshTable={this.refreshTable}/>
          </div>
        ) : null}
      </div>
    );
  }
}
