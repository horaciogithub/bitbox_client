import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default class ItemsTableComponent extends Component {
  render() {
    return this.props.items !== null ? (
      <div id="table" className="container">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Description</th>
                <th>
                  <div className="state-container">
                    <p> State</p>
                    <button onClick={this.props.changeState} />
                  </div>
                </th>
                <th>Price</th>
                <th>Creator</th>
                <th>Reduced price</th>
                <th>Start date</th>
                <th>End date</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item => (
                <tr key={item.itemCode}>
                  <td>{item.itemCode}</td>
                  <td>{item.description}</td>
                  <td>{item.state}</td>
                  <td>{item.price}</td>
                  <td>{item.creator.name}</td>
                  <td>
                    {item.priceReduction !== null
                      ? item.priceReduction.reducedPrice
                      : 0}
                  </td>
                  <td>
                    {item.priceReduction !== null
                      ? item.priceReduction.startDate
                      : ""}
                  </td>
                  <td>
                    {item.priceReduction !== null
                      ? item.priceReduction.endDate
                      : ""}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => this.props.delete(item.itemCode)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : null;
  }
}
