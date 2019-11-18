import React, { Component } from "react";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class UsersTableComponent extends Component {
  render() {
    return (
      <div  className="table-data container">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Role</th>
                <th></th>
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
                    onChange={this.props.change}
                    required
                     autoComplete="off"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={this.props.change}
                    required
                     autoComplete="off"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={this.props.change}
                     autoComplete="off"
                  />
                </td>
                <td>
                  <select name="role" onChange={this.props.change}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.props.change}
                     autoComplete="off"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={this.props.click}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </td>
              </tr>
              {this.props.users.map(user => (
                user.id === JSON.parse(sessionStorage.getItem("userData")).id ? 
                  <tr key={user.id} className="admin-row">
                  <td>{user.name}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td></td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => this.props.delete(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr> :
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td></td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => this.props.delete(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
