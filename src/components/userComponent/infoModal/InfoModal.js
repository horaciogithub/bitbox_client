import React, { Component } from "react";

import "./InfoModal.css";

export default class InfoModal extends Component {
  render() {
    let i = 1; // Suppliers second id map
    return this.props.data.map(item => (
      <div
        key={"k1 - " + item.itemCode}
        className="modal fade"
        id={"id" + item.itemCode}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Item {item.itemCode} details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {item.suppliers.length ? (
                <div className="suppliers-table container">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Supplier</th>
                          <th>Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.suppliers.map(supplier => (
                          <tr key={i++}>
                            <td>{supplier !== null ? supplier.name : null}</td>
                            <td>
                              {supplier !== null ? supplier.country : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p>The item does not have suppliers information</p>
              )}

              {item.priceReduction !== null ? (
                <div className="reducedPrice">
                  <div>
                    <p className="price-reduction">
                      <span>Price reducion: </span>
                      {item.priceReduction.reducedPrice} €
                    </p>

                    <p className="price-reduction">
                      <span>Start date: </span> {item.priceReduction.startDate}
                    </p>

                    <p className="price-reduction">
                      <span>End date: </span> {item.priceReduction.endDate}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
